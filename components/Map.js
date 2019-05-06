import React from 'react';
import { View, Modal, TouchableHighlight, Vibration, Text} from 'react-native';
import { MapView } from 'expo';

// a map modal component to appear on top of another compoennt
// when the user clicks away from the map, this.props.onCloseAreaClick gets called
// so the parent component can hide this component

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      lat: Number(this.props.lat),
      lon: Number(this.props.lon)
    };
  }  

  handleMapClick = (e) => {    
    if (this.props.inEdit){
      Vibration.vibrate();
      this.setState({lat: e.nativeEvent.coordinate.latitude, lon: e.nativeEvent.coordinate.longitude});
    }    
  }

  // this gets called whenever new props are passed to this component
  // in our case, when the user changes the coordinates in the text inputs
  // we then update the state here so the map marker will move to the appropriate coordinates
  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat || this.props.lon !== prevProps.lon) {
      this.setState({lat: Number(this.props.lat), lon: Number(this.props.lon)});
    }
  }
  
  render() {    
    return (             
      <Modal style={{flex: 1}} visible={this.props.visible} transparent={true} animationType="slide">
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableHighlight style={{flex: 2}} onPress={(coords) => this.props.onCloseAreaClick(this.state)}> 
            <View style={{flex: 1, flexDireciton:'column', justifyContent:'flex-end', alignItems:'center', paddingBottom: 5}}>
					{this.props.inEdit && <Text style={{backgroundColor: 'darkseagreen', borderRadius: 5, overflow: 'hidden', padding: 3}}> Click on the map to move the marker </Text>}
				</View>				
          </TouchableHighlight>
          <View style={{ flex: 6, marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'gainsboro', borderRadius: 30, overflow: "hidden" }}>             			 	
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={this.handleMapClick}              
              >
              <MapView.Marker
                coordinate={{latitude: this.state.lat, longitude: this.state.lon}}
                image={require('../assets/pin.png')}
				      />
            </MapView>
          </View>        
          <TouchableHighlight style={{flex: 2}} onPress={(coords) => this.props.onCloseAreaClick(this.state)}> 
            <View style={{flex: 1}}/>
          </TouchableHighlight> 
        </View>
      </Modal>
       
    );
  }
}