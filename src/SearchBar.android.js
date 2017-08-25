import React from 'react';
import { NativeModules, StyleSheet, TextInput, View } from 'react-native';
import { withNavigation } from 'react-navigation';

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
    if (this.props.tintColor) {
      searchInputStyle.color = this.props.tintColor;
    }

    return (
      <View style={styles.container}>
        <TextInput
          ref={view => {
            this._textInput = view;
          }}
          placeholder="Search"
          placeholderStyle={styles.searchPlaceholderText}
          value={this.state.text}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid={this.props.underlineColorAndroid || '#ccc'}
          onSubmitEditing={this._handleSubmit}
          onChangeText={this._handleChangeText}
          style={[styles.searchInput, searchInputStyle]}
        />
      </View>
    );
  }

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
  searchPlaceholderText: {
    color: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: 5,
    marginRight: 5,
  },
});
