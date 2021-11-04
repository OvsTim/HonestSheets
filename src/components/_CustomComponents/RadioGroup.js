import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hScale, vScale} from '../../utils/scaling';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: '',
    };
  }

  onSelect = item => {
    this.setState({selectedIndex: item.id}, () => {
      this.props.onItemSelected(item);
    });
  };

  renderItem(item, selected = this.state.selectedIndex) {
    const {renderItem, itemContainerStyle} = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.onSelect(item)}
        style={[
          {flexDirection: 'row', alignItems: 'center'},
          itemContainerStyle,
        ]}>
        <View style={styles.button}>
          {item.id === selected && <View style={styles.checked} />}
        </View>
        {renderItem(item)}
      </TouchableOpacity>
    );
  }

  render() {
    const {data, selected, containerStyle} = this.props;

    return (
      <FlatList
        contentContainerStyle={containerStyle}
        data={data}
        renderItem={({item}) => this.renderItem(item, selected)}
        keyExtractor={item => item.id}
        extraData={this.state}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    marginLeft: hScale(16),
    height: vScale(20),
    width: vScale(20),
    borderColor: '#E0E0E0',
    borderRadius: vScale(10),
    borderWidth: hScale(2),
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#E7B593',
    borderRadius: vScale(12 / 2),
    height: vScale(12),
    width: vScale(12),
  },
});

RadioGroup.defaultProps = {
  data: [],
  containerStyle: {},
  itemContainerStyle: {
    height: vScale(64),
    width: hScale(375),
  },
  onItemSelected: item => {
    console.log('onItemSelected', item);
  },
  renderItem: item => {
    return <View />;
  },
  selected: undefined, //если нужно обрабатывать выбор элементов вне компонента
};

export default RadioGroup;
