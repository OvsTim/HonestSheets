import React, {Ref, useState} from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  TextInputProps,
  TextProps,
  Text,
  TextStyle,
  Pressable,
  Image,
} from 'react-native';
import {vScale, hScale, window} from '../../utils/scaling';

type Props = {
  value: string;
  onTextChanges: (term: string) => void;
  styleInput: TextStyle;
  styleContainer: ViewStyle;
  editable: boolean;
  placeholder: string;
  label: string;
  inputProps: TextInputProps;
  labelStyle: TextProps;
  showLabel: boolean;
  inputRef?: Ref<TextInput>;
  isPassword?: boolean;
};

export default function BaseInput(props: Props) {
  function handleInput(input: string) {
    props.onTextChanges(input);
  }

  const [isVisible, setIsVisible] = useState<boolean>(false);

  function renderLabel() {
    return (
      <View
        style={{
          position: 'absolute',
          left: hScale(16),
          top: -vScale(16) / 2,
          backgroundColor: 'lightgray',
          height: vScale(16),
          paddingHorizontal: hScale(15),
          borderRadius: vScale(16) / 2,
        }}>
        <Text
          style={[
            {
              color: 'gray',
            },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width: window().width - hScale(32),
          height: vScale(44),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: vScale(6),
          borderWidth: vScale(2),
          borderColor: 'lightgray',
          backgroundColor: 'transparent',
        },
        props.styleContainer,
      ]}>
      <TextInput
        ref={props.inputRef}
        style={[
          {
            width: '100%',
            paddingRight: hScale(32),
            paddingLeft: hScale(12),
            fontSize: vScale(14),
            backgroundColor: 'transparent',
          },
          props.styleInput,
        ]}
        onChangeText={terms => {
          handleInput(terms);
        }}
        editable={props.editable}
        {...props.inputProps}
        secureTextEntry={props.isPassword && !isVisible}
        value={props.value}
        placeholder={props.placeholder}
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
      {props.isPassword && (
        <Pressable
          onPress={() => setIsVisible(prevState => !prevState)}
          style={{position: 'absolute', right: 10}}
          android_ripple={{radius: 200, color: 'gray'}}>
          <Image
            style={{width: 40, height: 40}}
            source={
              !isVisible
                ? require('../../assets/outline_visibility_black_24.png')
                : require('../../assets/outline_visibility_off_black_24.png')
            }
          />
        </Pressable>
      )}
      {props.showLabel && renderLabel()}
    </View>
  );
}

BaseInput.defaultProps = {
  value: '',
  onTextChanges: () => {},
  styleInput: {}, //стиль для поля ввода текста
  styleContainer: {}, // стиль для контейнера, в котором находится поле ввода
  editable: true,
  placeholder: 'Текст',
  label: 'Текст',
  inputProps: {},
  labelStyle: {},
  showLabel: false,
  isPassword: false,
};
