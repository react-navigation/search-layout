declare module 'react-navigation-addon-search-layout' {
  import * as React from 'react';

  interface SearchLayoutProps {
    /** Callback that fires when the text in the search input is changed **/
    onChangeQuery: (query: string) => void;

    /** Callback that fires when the user submits the input by pressing return **/
    onSubmit?: (query: string) => void;

    /** Background color of the header that contains the search bar **/
    headerBackgroundColor?: string;

    /** Tint color of the header that contains the search bar. Used to color the back buttoni on Android, the cancel button on iOS, and the color of and ripple around the clear button on Android **/
    headerTintColor?: string;

    /** Color of the placeholder text that is visible when the user has not entered any input into the search box **/
    placeholderTextColor?: string;

    /** Color of text that the user enters into the search box **/
    textColor?: string;

    /** FontFamily of text that the user enters into the search box and for the text shown as cancel button **/
    textFontFamily?: string;

    /** Underline color of the text input on Android **/
    searchInputUnderlineColorAndroid?: string;

    /** Override headerTintColor for the cancel button / clear button **/
    searchInputTintColor?: string;

    /** Alternative to using children to render the results **/
    renderResults?: () => React.ReactElement | null;
  }

  export default class SearchLayout extends React.Component<SearchLayoutProps> {}
}
