import React from 'react';
import { NativeModules, StyleSheet, TextInput, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';

@withNavigation
export default class SearchBar extends React.PureComponent {
  componentDidMount() {
    requestAnimationFrame(() => {
      this._textInput.focus();
    });
  }

  state = {
    text: '',
  };

  render() {
    let searchInputStyle = {};
    if (this.props.textColor) {
      searchInputStyle.color = this.props.textColor;
    }

    return (
      <View style={styles.container}>
        <TextInput
          ref={view => {
            this._textInput = view;
          }}
          placeholder="Search"
          placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
          value={this.state.text}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={this.props.selectionColor}
          underlineColorAndroid={this.props.underlineColorAndroid || '#ccc'}
          onSubmitEditing={this._handleSubmit}
          onChangeText={this._handleChangeText}
          style={[styles.searchInput, searchInputStyle]}
        />
        <View
          style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
          {this.state.text
            ? <Touchable
                onPress={this._handleClear}
                hitSlop={{top: 15, left: 10, right: 15, bottom: 15}}
                style={{ padding: 5 }}
                background={Touchable.Ripple(this.props.tintColor, true)}>
                <Ionicons
                  name="md-close"
                  size={25}
                  color={this.props.tintColor}
                />
              </Touchable>
            : null}
        </View>
      </View>
    );
  }

  _handleClear = () => {
    this.setState({ text: '' });
  };
  _handleChangeText = text => {
    this.setState({ text });
    this.props.onChangeQuery && this.props.onChangeQuery(text);
  };

  _handleSubmit = () => {
    let { text } = this.state;
    this.props.onSubmit && this.props.onSubmit(text);
    this._textInput.blur();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: 5,
    marginRight: 5,
  },
});
