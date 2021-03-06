import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import constants from '../constants';
import styles from '../styles';

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <TextInput 
      style={{ 
        width: constants.width - 40, 
        height: 35, 
        backgroundColor: styles.white,
        paddingHorizontal: 20
      }}
      returnKeyType="search"
      value={value} 
      placeholder="Search... " 
      onEndEditing={onSubmit}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={styles.darkGreyColor}
    />
  )
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
