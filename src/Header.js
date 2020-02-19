import React from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';
import { getInset, getStatusBarHeight } from 'react-native-safe-area-view';
import { isIphoneX } from 'react-native-iphone-x-helper';

// @todo: make this work properly when in landscape
const hasNotch = isIphoneX();

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

@withNavigation
export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    // @todo: this is static and we don't know if it's visible or not on iOS.
    // need to use a more reliable and cross-platform API when one exists, like
    // LayoutContext. We also don't know if it's translucent or not on Android
    // and depend on react-native-safe-area-view to tell us.
    const ANDROID_STATUS_BAR_HEIGHT = getStatusBarHeight
      ? getStatusBarHeight()
      : StatusBar.currentHeight;
    const STATUSBAR_HEIGHT =
      Platform.OS === 'ios' ? (hasNotch ? 40 : 25) : ANDROID_STATUS_BAR_HEIGHT;

    let platformContainerStyles;
    if (Platform.OS === 'ios') {
      platformContainerStyles = {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#A7A7AA',
      };
    } else {
      platformContainerStyles = {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
          height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
      };
    }

    this.styles = {
      container: {
        backgroundColor: '#fff',
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
        ...platformContainerStyles,
      },
      appBar: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      title: {
        bottom: 0,
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
        top: 0,
        position: 'absolute',
        alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
      },
      left: {
        left: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
      },
      right: {
        right: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
      },
    };
  }

  _navigateBack = () => {
    if (this.props.onCancelPress) {
      this.props.onCancelPress(this.props.navigation.goBack);
    } else {
      this.props.navigation.goBack();
    }
  };

  _maybeRenderBackButton = () => {
    if (!this.props.backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={this._navigateBack}
        pressColorAndroid={this.props.tintColor || '#fff'}
        tintColor={this.props.tintColor}
        title={this.props.backButtonTitle || null}
        truncatedTitle={this.props.backButtonTruncatedTitle || null}
        titleStyle={this.props.backButtonTitleStyle || null}
      />
    );
  };

  render() {
    let { styles } = this;
    let headerStyle = {};
    if (this.props.backgroundColor) {
      headerStyle.backgroundColor = this.props.backgroundColor;
    }

    return (
      <Animated.View style={[styles.container, headerStyle]}>
        <View style={styles.appBar}>
          <View style={[StyleSheet.absoluteFill, styles.header]}>
            {this._maybeRenderBackButton()}
            {this.props.children}
          </View>
        </View>
      </Animated.View>
    );
  }
}
