import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomScrollViewIndicator from 'react-native-custom-scrollview-indicator';
import {Placeholder} from './Placeholders';

class App extends React.Component {
  state = {
    currentIndex: 0,
  };

  constructor(props) {
    super(props);
    this.scrollToIndex = this.scrollToIndex.bind(this);
  }

  scrollToIndex(index) {
    this.setState({currentIndex: index});
    this.customScrollView.getNode().scrollToIndex({index});
  }

  renderTab(index, onPress, active) {
    return (
      <View style={{flex: 1}} key={index}>
        <TouchableOpacity onPress={() => onPress(index)}>
          <View
            style={{
              backgroundColor: active ? 'dodgerblue' : 'lightgrey',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{index}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const itemWidth = 200;
    const spacing = 10;
    const data = [...Array(10)].map((item, index) => index);
    const {currentIndex} = this.state;
    return (
      <View style={{marginTop: 20}}>
        <CustomScrollViewIndicator
          // horizontal={false}
          data={data}
          renderItem={Placeholder}
          keyExtractor={(item, index) => 'custom-scrollview-indicator-' + index}
          itemSize={itemWidth + spacing}
          spacing={spacing}
          itemCount={data.length}
          indicatorSize={5}
          indicatorBackgroundColor="dodgerblue"
          containerIndicatorStyle={{marginVertical: 10}}
          containerIndicatorBackgroundColor="lightblue"
          onSnap={index => {
            this.setState({currentIndex: index});
          }}
          ref={component => {
            this.customScrollView = component;
          }}
        />
        <View style={{flexDirection: 'row', margin: 5}}>
          {data.map((item, index) =>
            this.renderTab(index, this.scrollToIndex, currentIndex === index),
          )}
        </View>
      </View>
    );
  }
}

export default App;
