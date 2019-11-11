// @flow
import * as React from 'react';
import {View, Text} from 'react-native';

type Props = {number: number};

export function Placeholder() {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 24, color: 'grey'}}>
        placeholder
      </Text>
    </View>
  );
}

class Placeholders extends React.Component<Props> {
  render() {
    const {number = 10} = this.props;
    return (
      <View style={{padding: 5, flex: 1, backgroundColor: 'white'}}>
        <Placeholder />
        {[...Array(number)].map((item, index) => (
          <Placeholder key={`placeholder-index-${index}`} />
        ))}
      </View>
    );
  }
}

export default Placeholders;
