import {NavigationActions,StackActions} from 'react-navigation';

import {AppNavigator} from '../Navigator/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Splash');

const initialNavState = AppNavigator.router.getStateForAction(
    firstAction,
);

export function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'HOME':
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Menu', params: {foo: 'bar'}})
                    ]
                }),
                state
            );
            break;
        case 'INTRO':
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Intro', params: {foo: 'bar'}})
                    ]
                }),
                state
            );
            break;
        case 'RESET':
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Splash', params: {foo: 'bar'}})
                    ]
                }),
                state
            );
            break;
        case 'LOGIN_':
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Menu'})
                    ]
                }),
                state
            );
            break;
        case 'LOG_OUT_SUCCESS':
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Splash'})
                    ]
                }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}