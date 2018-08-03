import {combineReducers} from 'redux'
import {nav} from './dataReducers'
import {redGetColor} from './colorReducers'
import {redSetting} from './settingReducers'
import {redAuth, redRegister} from './authReducers'
import {redAddReserve, redGetListReserve, redGetListReserveUser,redUpdateReserve} from './reserveReducers'

const rootReducer = combineReducers({
    redGetColor: redGetColor,
    redAuth: redAuth,
    redRegister: redRegister,
    redAddReserve: redAddReserve,
    redGetListReserve: redGetListReserve,
    redGetListReserveUser: redGetListReserveUser,
    redSetting: redSetting,
    redUpdateReserve: redUpdateReserve,
    nav: nav
})

export default rootReducer