import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';



export default class UserProfile extends Component
 {

   // Title bar with title
  static navigationOptions = 
  {

   title: 'User Profile',
   headerBackTitle : null,
   headerTitleStyle :{alignSelf: 'center',fontSize: 22, fontWeight: '200', flex:1, textAlign: 'center'},
   headerRight: (Platform.OS === 'android') ? <View/> : null,
   headerTitleAlign: 'center',
   headerStyle:{
       backgroundColor:'white',
   },
   tintColor: '#99d9f4'
 

};

constructor() 
{
  super();


  // state management
  this.state =
    { 
      name:'',
      email:'',
      phone:'',
      filePath: {},
      
    }
}

// Choose option from the dropdown 
chooseFile = () => {
  var options = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  
  ImagePicker.showImagePicker(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      let source = response;
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({
        filePath: source,
      });
    }
  });
};

// Opening camera capturing screen
launchCamera = () => {
  var options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
      alert('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      alert('ImagePicker Error: ' + response.error);
    } else {
      let source = response;
      this.setState({
        filePath: source,
      });
    }
  });
};


// Remove photo when user already have it on the profile
removePicture = () => 
{
  if(this.state.filePath === {} || this.state.filePath === "")
  {
      Alert.alert("Alert!!", "No Image is set currently."
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false},
      )
  }
  else
  {
    this.setState({
      filePath: {},
    });
  }
 
}

// Opening Gallery to choose picture
launchLibrary = () => {
  var options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


ImagePicker.launchImageLibrary(options, (response) => {
  console.log('Response = ', response);
  if (response.didCancel) {
    console.log('User cancelled image picker');
    alert('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
    alert('ImagePicker Error: ' + response.error);
  } else {
    let source = response;
    this.setState({
      filePath: source,
    });
  }
});
};

 //Call to get data for the profile from the previous screen
 async componentDidMount() {
  try {
    this.setState({name :this.props.navigation.state.params.Name})
    this.setState({email:this.props.navigation.state.params.Email})
    this.setState({phone:this.props.navigation.state.params.Phone})

    console.log('=== Information ===', name, email, phone)

  }
  catch (error) 
  {
    console.log('componentDidMount Error', error)
  }
}
    render() {
        return (
        
           <View>

                <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 200, height: 200, borderRadius: 200 / 2, justifyContent: "center", alignContent: "center", backgroundColor: '#C6B6B4', margin: 10}}
          />

          </View>
          {/* <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          /> */}
          {/* <Text style={{ alignItems: 'center', marginBottom: 20, marginLeft: 20, marginRight: 20}}>
            {this.state.filePath.uri}
          </Text> */}
          
          <TouchableOpacity
              style={styles.button}
              onPress={this.chooseFile.bind(this)}>
            <Text>Choose File</Text>
          </TouchableOpacity>
          { <TouchableOpacity
              style={styles.button}
              onPress={this.removePicture.bind(this)}>
            <Text>Remove Selected Photo</Text>
          </TouchableOpacity>
         
         /*<TouchableOpacity
              style={styles.button}
              onPress={this.launchLibrary.bind(this)}>
            <Text>Directly Launch Image Library</Text>
          </TouchableOpacity> */}


          <View style={styles.backgroundContainer}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>{'Name : ' + this.state.name}
         </Text>
        </View>
        <View style={styles.backgroundContainer}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
           {'Email : ' + this.state.email}
         </Text>
        </View>
        <View style={styles.backgroundContainer}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
          {'Mobile No : ' + this.state.phone}
         </Text>
       </View>

          </View>
        );
      
        }
      }


      // Styling of the screen/design of the screen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      top: 0,
      backgroundColor: '#FFFFFF'
    },
    backgroundContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFFFFF',
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      flexDirection: 'row'
      },
      titleText: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 19,
        fontWeight: '200',
        flex: 1
      },
      buttonText: {
        fontSize: 22,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        alignItems: 'center', 
        backgroundColor: '#C6B6B4',
        padding: 10,
        color:"#ffffff",
        fontSize:22,
        marginLeft:20,
        marginRight:20,
        marginTop:16,
        alignContent: 'center',
        justifyContent: 'center'
      }
  })
 
