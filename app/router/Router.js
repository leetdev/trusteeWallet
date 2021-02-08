/**
 * @version 0.10
 */
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import WalletCreateStack from './WalletCreateStack'
import WalletBackupStack from './WalletBackupStack'

import ErrorScreen from './ErrorScreen'

import InitScreen from '../modules/Init/InitScreen'
import WalletCreateScreen from '../modules/WalletCreate/WalletCreateScreen'
import BackupSettingsScreen from '../modules/WalletBackup/Settings'
import EnterMnemonicPhrase from '../modules/WalletCreate/EnterMnemonicPhrase'
import EnterMnemonicPhraseGoogle from '../modules/WalletCreate/EnterMnemonicPhraseGoogle'
import QRCodeScannerScreen from '../modules/QRCodeScanner/QRCodeScannerScreen'

import HomeScreenStack from './HomeStack'
import ExchangeV3ScreenStack from './ExchangeV3ScreenStack'
import TradeScreenStack from './TradeScreenStack'
import TradeV3ScreenStack from './TradeV3ScreenStack'
import SettingsScreenStack from './SettingsStack'

import NotificationsScreen from '../modules/Notifications'

import WebViewScreen from '../modules/WebView'

import AddCardScreen from '../modules/Card'
import SendScreen from '../modules/Send/SendScreen'
import SendAdvancedSettingsScreen from '../modules/Send/SendAdvancedSettings'
import ReceiptScreen from '../modules/Send/ReceiptScreen'

import LoadScreen from '../modules/Load/LoadScreen'

import LockScreen from '../modules/LockScreen/LockScreen'

import AboutScreen from '../modules/About/AboutScreen'
import FioChooseRecipient from '../modules/FIO/FioChooseRecipient'
import FioSendRequest from '../modules/FIO/FioSendRequest'
import FioRequestsList from '../modules/FIO/FioRequestsList'
import FioChooseAddress from '../modules/FIO/FioChooseAddress'
import FioRequestDetails from '../modules/FIO/FioRequestDetails'
import FioAddresses from '../modules/FIO/FioAddresses'
import FioMainSettings from '../modules/FIO/FioMainSettings'
import FioSettings from '../modules/FIO/FioSettings'
import AccountScreen from '../modules/Account/AccountScreen'
import AccountSettingScreen from '../modules/Account/AccountSettings/AccountSettingsScreen'
import ReceiveScreen from '../modules/Account/ReceiveScreen'
import TransactionScreen from '../modules/Account/TransactionScreen'
import CheckV3DataScreen from '../modules/Account/CheckV3'
import AddAssetScreen from '../modules/AddAsset/AddAssetScreen'
import SMSCodeScreen from '../modules/Trade/SMSCodeScreen'
import WalletConnectScreen from '../modules/WalletConnect/WalletConnectScreen'


const MainNavigator = createStackNavigator({
        InitScreen: {
            screen: InitScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        ErrorScreen: {
            screen: ErrorScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        WalletConnectScreen: {
            screen: WalletConnectScreen,
            navigationOptions: {
                headerShown: false
            }
        },


        SendScreen: {
            screen: SendScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        SendAdvancedScreen: {
            screen: SendAdvancedSettingsScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        ReceiptScreen: {
            screen: ReceiptScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        FioChooseRecipient: {
            screen: FioChooseRecipient,
            navigationOptions: {
                headerShown: false
            }
        },

        FioChooseAddress: {
            screen: FioChooseAddress,
            navigationOptions: {
                headerShown: false
            }
        },

        FioSendRequest: {
            screen: FioSendRequest,
            navigationOptions: {
                headerShown: false
            }
        },

        FioRequestsList: {
            screen: FioRequestsList,
            navigationOptions: {
                headerShown: false
            }
        },

        FioRequestDetails: {
            screen: FioRequestDetails,
            navigationOptions: {
                headerShown: false
            }
        },

        FioAddresses: {
            screen: FioAddresses,
            navigationOptions: {
                headerShown: false
            }
        },

        FioMainSettings: {
            screen: FioMainSettings,
            navigationOptions: {
                headerShown: false
            }
        },

        FioSettings: {
            screen: FioSettings,
            navigationOptions: {
                headerShown: false
            }
        },

        AccountScreen: {
            screen: AccountScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        AccountSettings: {
            screen: AccountSettingScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        TransactionScreen: {
            screen: TransactionScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        CheckV3DataScreen: {
            screen: CheckV3DataScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        ReceiveScreen: {
            screen: ReceiveScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        QRCodeScannerScreen: {
            screen: QRCodeScannerScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        EnterMnemonicPhrase: {
            screen: EnterMnemonicPhrase,
            navigationOptions: {
                headerShown: false
            }
        },
        EnterMnemonicPhraseGoogle: {
            screen: EnterMnemonicPhraseGoogle,
            navigationOptions: {
                headerShown: false
            }
        },
        WalletCreateScreen: {
            screen: WalletCreateScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        BackupSettingsScreen: {
            screen: BackupSettingsScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        DashboardStack: {
            screen: HomeScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        HomeScreenStack: {
            screen: HomeScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        NotificationsScreen: {
            screen: NotificationsScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        WebViewScreen: {
            screen: WebViewScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        TradeScreenStack: {
            screen: TradeScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        ExchangeV3ScreenStack: {
            screen: ExchangeV3ScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        TradeV3ScreenStack: {
            screen: TradeV3ScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        SettingsScreenStack: {
            screen: SettingsScreenStack,
            navigationOptions: {
                headerShown: false
            }
        },

        AddAssetScreen: {
            screen: AddAssetScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        WalletCreateStack: {
            screen: WalletCreateStack,
            navigationOptions: {
                headerShown: false
            }
        },

        WalletBackupStack: {
            screen: WalletBackupStack,
            navigationOptions: {
                headerShown: false
            }
        },

        LockScreen: {
            screen: LockScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        AboutScreen: {
            screen: AboutScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        AddCardScreen: {
            screen: AddCardScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        LoadScreen: {
            screen: LoadScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        SMSCodeScreen: {
            screen: SMSCodeScreen,
            navigationOptions: {
                headerShown: false
            }
        }
    },
    {
        initialRouteName: 'LoadScreen'
    }
)

export default createAppContainer(MainNavigator)


