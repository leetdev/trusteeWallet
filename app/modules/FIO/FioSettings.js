/**
 * @version 0.9
 */
import React, { Component } from 'react'
import { View, Text, ScrollView, Switch, Linking } from 'react-native'

import Navigation from '../../components/navigation/Navigation'
import Button from '../../components/elements/Button'
import SettingsCoin from './elements/SettingsCoin'
import { strings } from '../../services/i18n'
import GradientView from '../../components/elements/GradientView'
import { connect } from 'react-redux'
import config from '../../config/config'
import Moment from 'moment';
import { setLoaderStatus } from '../../appstores/Stores/Main/MainStoreActions'
import { addCryptoPublicAddresses, resolveCryptoCodes, getPubAddress } from '../../../crypto/blockchains/fio/FioUtils'
import NavStore from '../../components/navigation/NavStore'
import accountDS from '../../appstores/DataSource/Account/Account'

class FioSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAllWalletsSelected: false,
            cryptoCurrencies: [],
            accounts: [],
            selectedCryptoCurrencies: {},
            fioAddress: null,
            fioAddressExpiration: null,
        }
    }

    async componentDidMount() {
        const fioAddress = this.props.navigation.getParam('fioAddress')

        const { cryptoCurrencies } = this.props.currencyStore
        const availableCurrencies = cryptoCurrencies?.filter(c => !c.isHidden)
        const availableCurrenciesCodes = availableCurrencies.map(c => c.currencyCode)

        const { selectedWallet } = this.props.mainStore

        const accountListByWallet = this.props.accountStore.accountList[selectedWallet.walletHash] || {}
        const accounts = await Object.entries(accountListByWallet).reduce(async (resP, [_, account]) => {
            const res = await resP;

            const isAvailable = availableCurrenciesCodes.includes(account.currencyCode)
            if (!isAvailable) {
                return res
            }

            account.currencyName = availableCurrencies.find(c => c.currencyCode === account.currencyCode)?.currencyName

            if (account.currencyCode === 'BTC') {
                const accounts = await accountDS.getAccountData({
                    walletHash: selectedWallet.walletHash,
                    currencyCode: account.currencyCode,
                    splitSegwit : true,
                    notAlreadyShown: 1,
                })
                if (accounts && accounts.length > 1) {
                    return [
                        ...res,
                        {
                            ...account,
                            ...accounts[0],
                        },
                        {
                            ...account,
                            ...accounts[1],
                        }
                    ]
                }
            }

            return [
                ...res,
                account,
            ]
        }, [])

      this.setState({
            fioAddress: fioAddress.fio_address,
            fioAddressExpiration: fioAddress.expiration,
            accounts,
            cryptoCurrencies: availableCurrenciesCodes
        })
        setLoaderStatus(true)
        try {
            await this.resolvePublicAddresses(fioAddress.fio_address, availableCurrenciesCodes)
        } finally {
            setLoaderStatus(false)
        }
    }

    resolvePublicAddresses = async (fioAddress, cryptoCurrencies) => {
        if (cryptoCurrencies) {
            const publicAddresses = await Promise.all(cryptoCurrencies.map(currencyCode => {
                const codes = resolveCryptoCodes(currencyCode)
                return getPubAddress(fioAddress, codes['chain_code'], codes['token_code'])
            }))

            this.setState({
                selectedCryptoCurrencies: cryptoCurrencies.reduce((res, currencyCode, index) => ({
                    ...res,
                    [currencyCode]: publicAddresses[index]
                }), {})
            })
        }
    }

    toggleSwitchAll = () => {
        const { isAllWalletsSelected, cryptoCurrencies, accounts } = this.state

        this.setState({
            isAllWalletsSelected: !isAllWalletsSelected,
            selectedCryptoCurrencies: isAllWalletsSelected
                ? {}
                : cryptoCurrencies.reduce((res, currencyCode) => {
                    const account = accounts.find(a => a.currencyCode === currencyCode)
                    return ({
                        ...res,
                        [currencyCode]: account ? account.address : '0'
                    })
                }, {})
        })
    }

    toggleSwitch = (currencyCode, address) => {
        const { selectedCryptoCurrencies } = this.state

        this.setState({
            selectedCryptoCurrencies: {
                ...selectedCryptoCurrencies,
                [currencyCode]: address,
            }
        })
    }

    renderSettingCoins = (data) => {
        const { selectedCryptoCurrencies } = this.state
        return (
            data.map((item, key) => (
                <SettingsCoin
                    key={key}
                    cryptoCurrency={item}
                    isSelected={selectedCryptoCurrencies[item.currencyCode] === item.address}
                    toggleSwitch={this.toggleSwitch}
                />
            ))
        )
    }

    handleNext = async () => {
        try {
            const { selectedCryptoCurrencies, fioAddress, cryptoCurrencies } = this.state

            setLoaderStatus(true)
            const publicAddresses = cryptoCurrencies
                .reduce((res, currencyCode) =>
                    [
                        ...res,
                        {
                            ...resolveCryptoCodes(currencyCode),
                            public_address: selectedCryptoCurrencies[currencyCode] || '0'
                        }
                    ], [])

            await addCryptoPublicAddresses({
                fioName: fioAddress,
                publicAddresses
            })
        } finally {
            setLoaderStatus(false)
        }
    }

    handleRegisterFIOAddress = async () => {
        const { accountList } = this.props.accountStore
        const { selectedWallet } = this.props.mainStore
        const { apiEndpoints } = config.fio

        const publicFioAddress = accountList[selectedWallet.walletHash]['FIO']?.address
        if (publicFioAddress) {
            Linking.openURL(`${apiEndpoints.registrationSiteURL}${publicFioAddress}`)
        } else {
            // TODO show some warning tooltip
        }
    }

    navCloseAction = () => {
        NavStore.goNext('SettingsMainScreen')
    }

    render() {
        const { fioAddress, fioAddressExpiration } = this.state
        Moment.locale('en');

        return (
            <View>
                <Navigation
                    title={strings('FioSettings.title')}
                    closeAction={this.navCloseAction}
                />

                <View style={{paddingTop: 80, height: '100%'}}>

                    <GradientView
                        array={styles_.array}
                        start={styles_.start} end={styles_.end}>
                        <View style={styles.titleSection}>
                            {
                                fioAddress ? (
                                    <View>
                                        <Text style={styles.titleTxt1}>{fioAddress}</Text>
                                        <Text style={styles.titleTxt2}>{strings('FioSettings.Expire')} {Moment(fioAddressExpiration).format('lll')} </Text>
                                    </View>
                                ) : (
                                        /* if fio address not registered */
                                        <View>
                                            <Text style={styles.titleTxt1}>{strings('FioSettings.noFioTitle')}</Text>
                                        </View>
                                )
                             }
                        </View>
                    </GradientView>

                    {
                        fioAddress ? (
                            <View style={styles.container}>
                                <View>
                                    <Text style={styles.txt}>{strings('FioSettings.description')} </Text>
                                </View>

                                <View style={{ flex: 1, paddingVertical: 20 }}>
                                    <ScrollView style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>

                                        <View style={styles.coinRow}>
                                            <View style={styles.coinRowInfo}>
                                                <Text style={styles.txt2}>{strings('FioSettings.connectAllWallets')} </Text>
                                            </View>

                                            <Switch
                                                thumbColor="#fff"
                                                trackColor={{ true: '#864DD9', false: '#dadada' }}
                                                onValueChange={this.toggleSwitchAll}
                                                value={this.state.isAllWalletsSelected} />
                                        </View>

                                        {this.renderSettingCoins(this.state.accounts)}

                                    </ScrollView>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Button press={this.handleNext}>
                                        {strings('FioSettings.btnText')}
                                    </Button>
                                </View>

                            </View>
                        ) : (
                            /* if fio address not registered */
                            <View style={styles.container}>
                                <View>
                                    <Text style={styles.txt}> {strings('FioSettings.noFioDescription')} </Text>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Button press={this.handleRegisterFIOAddress}>
                                        {strings('FioSettings.noFioBtn')}
                                    </Button>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    mainStore: state.mainStore,
    accountStore: state.accountStore,
    currencyStore: state.currencyStore
})

export default connect(mapStateToProps, {})(FioSettings)

const styles_ = {
    array: ['#43156d', '#7127ab'],
    start: { x: 0.0, y: 0.5 },
    end: { x: 1, y: 0.5 }
}

const styles = {

    container: {
        padding: 30,
        paddingTop: 10,
        height: '100%',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
    },

    titleSection: {
        padding: 10,
        color: '#fff',
    },

    txtCenter: {
        textAlign: 'center',
    },

    titleTxt1: {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 19,
        color: '#fff',
        textAlign: 'center',
    },

    titleTxt2: {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginTop: -5,
    },

    txt: {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 19,
        color: '#777',
        textAlign: 'center',
    },

    txt2: {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 17,
        color: '#000',
    },

    coinRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderColor: '#ddd',
        borderBottomWidth: 1
    },

    coinRowInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
}
