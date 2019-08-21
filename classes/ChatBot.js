
import React, { Component } from 'react';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};


export default class ChatBot extends Component
 {


   // Title bar with title
  static navigationOptions = 
  {

   title: 'Register',
   headerBackTitle : null,
   headerTitleStyle :{alignSelf: 'center',fontSize: 22, fontWeight: '200', flex:1, textAlign: 'center'},
   headerRight: (Platform.OS === 'android') ? <View/> : null,
   headerTitleAlign: 'center',
   headerStyle:{
       backgroundColor:'white',
   },
   tintColor: '#99d9f4'
 
};


  constructor() {
    super();

    // Dialog flow configuration setup
    Dialogflow_V2.setConfiguration(
      "dialogflow-rcthpt@faq-bot-tsbgar.iam.gserviceaccount.com",//dialogflowConfig.client_email,
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeyuQxerkq1KB+\n7WZl+8HSAT3+56rIAdB6lXfcMbPgqyQJVrOScwELdwtmSsDeiJ9xu5Pcb+tjiS5M\nrYJabrEPPMf6NE4jLdhFSpXLFg95Ti4N08f4i67O2kUqhYN0zIOaHW2w2kV08Ulc\ntf2FJB4IbzY7a/u+W0ZwQaLd1/2bIrJ+x3VQ5VehvgZL0WFN/Vo6Py9famOG9BH4\n36hOgzAksmFvA8CAoq2gK/gOzb8XbB329bk8hlmRlGX87KJM1knET7mKbuNqdJMC\nneMl8+HFA2LKvyj8Cn6KYNyQWpZ2EjOT+dYtYXrdVLP5eCIo9ajIaBq1xva7Ompy\n4wdsEs/jAgMBAAECggEAFlODkxtktotvx3jciWFE5qCLFXCAOB/dLqceU6TfXCrj\n5bY9iE1IK9MAlNDU3lUKSgTsLLXFvFh43IoWxl1C4tgSa/D3vYWAH3n1prjC0zT1\nT7djqeQF34qb5/cevQjWRhB2MEP4ORGF1ZW3AAXMfTYZw3AS1LhjpnvsCNIKE8or\nqeSeXIZ+WZxFRxaRkKtVPT/OKdfYo1PFv6u6L1LzwizQVOlCflD2EzzfywGDwJiP\n5GtDtLAO7gWs+HBZcmoiMK/ZiwaLUZRo1ONnjGqBTKV5YpJMJmLlai5ovfqqh9/5\nLoGAxmvvC/OkcAVF8pcRAS/lJcoUg5h7iwuxqLp52QKBgQDdXa5WVddnprUuhuS5\nPJxsWjcvdJrxb0FDo3C1eucLxI7klMwFhMd7Ab7J6klvQ0kl9OW/4GrOrTWWX289\nDh1UEFHegK/YXt2p+zrjVh8YUgotPYy8ExRfqn4HJHQLu/RGM4DvEIvpokagIp9O\nzbCbbzr9WL4JSGxy0H+yshJwmQKBgQC3ovj4RqPlVkvJk48/h8aWUSG6f8A/0NB9\nQK5BKElcyLH/L9OJQ+kwayRK4wLzRNOmkJTMOpEn2I9YzQ7hc8xgbwx6AwjPOf5V\nFHAWI9DLTmsS9hkN1XiJR1MP+c0bX9ojCfeKZCxjS7umhneIauWaebK8/tGaw3FZ\n5kgHd1WF2wKBgQCJ1pN/3uPJ/txCpGw3i647KdHDEvCH9abF3zeHSYgko7f2TVDc\n/tjXlzads+0WAufBYsTMvYjEOMZtY+94LRnGBoNz8N2N9URBW9ZHSJEEK9F6aiD/\n20GMcDUZbXF0/QwVymw2cC8uw4UGoYhhIWMe5hvtNRzf2uDsfTeGpaslwQKBgGd+\nMsCB10ad3vKI9feBBtuad97KtseAYK/mbw6LrOTcuuwtwRMgMeC20WpfDD+b74h0\n/VcoPrxtIUSTtKo8/9btXuO4qBNaBMtgTFc98iNSW6gBCFeykk8T4m0jhIPD/oU2\nzcqx8A46FVShfeZlEGeB5Mj895Y4Rb67uKZ0i793AoGAEN4LIUymP+uUkftIY3hy\nuCbBg5+AjJtifOJ+pbHm7nRot2pojl/a17GVwNoax44PEpwjmxiicFoSXHnt1+Qi\nINh8z7WgzSTVItgtK1zoFps8n33SbWe6KgO/dpij5gYeLry7Wx6dcQEYwr9wvcPx\n7qNTsblgXn/UquaY/EU5cLs=\n-----END PRIVATE KEY-----\n"
      //dialogflowConfig.private_key
      ,Dialogflow_V2.LANG_ENGLISH_US,
      "faq-bot-tsbgar" //dialogflowConfig.project_id
    );

  
    // For Startup messages when user land on the ChatBot screen
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the FAQ bot.\n\nHow may I help you with today?`,
        //avatar: 'https://i.imgur.com/7k12EPD.png', 
        createdAt: new Date(),
        user: BOT_USER // Update with const, either we can also use JSON Object directly
      }
    ]
  };

  this.state =
    { 
      name:'',
      email:'',
      phone:'',
    }

  }

  // on click of send button default in the dailog flow
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;

    console.log("== message ==",message)

    Dialogflow_V2.requestQuery(
      message,
      result => 
      {
        this.handleGoogleResponse(result),
        console.log("== result Query ==",result)

        //JSON resultQuery = result.queryResult;
        const first = result.queryResult.allRequiredParamsPresent;

        console.log("== first ==",first)

       
        // Validations for getting response while entering input from user as per query or not
        if(first === true)
        {
          if(result.queryResult.parameters.hasOwnProperty('Full_Name'))
          {
             this.setState({name:result.queryResult.parameters.Full_Name})
             
             //name = result.queryResult.parameters.Full_Name

             console.log("==== IF ====", this.state.name)
          }
          else if(result.queryResult.parameters.hasOwnProperty('user_email') || result.queryResult.parameters.hasOwnProperty('user_email.original'))
          {
            this.setState({email:result.queryResult.parameters.user_email[0]})

            console.log("==== ELSE IF Email ====", this.state.email)
          }
          else if(result.queryResult.parameters.hasOwnProperty('phone_number'))
          {
            this.setState({phone:result.queryResult.parameters.phone_number})

            console.log("==== ELSE IF Phone ====", this.state.phone)
          }
          else
          {
          }
            console.log("==== ELSE ====")
            debugger
            if(this.state.name !== '' && this.state.email !== '' && this.state.phone !== '')
            {
              debugger

              setTimeout(

                () =>
                 {
                  const { navigate } = this.props.navigation;
                  navigate('UserProfile', { Name: this.state.name, Email: this.state.email, Phone: this.state.phone});
                },
                4 * 1000
            )

            
              
            }

        }

        error => console.log("== Request Query ==",error)
      }   
    );
  }

  // Handle Bot message and send to Bot
  handleGoogleResponse(result) 
  {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    console.log("== handleGoogleResponse ==",text)

    this.sendBotResponse(text);
  }

// Send bot message in the list
sendBotResponse(text) {
  let msg = {
    _id: this.state.messages.length + 1,
    text,
    createdAt: new Date(),
    user: BOT_USER
  };


  // Previous state manage
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, [msg])
  }));
}



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          textInputProps={{autoFocus: true}}
           showUserAvatar = {true}
           multiline = {false}
           onSend={messages => this.onSend(messages)}
           user={{
            _id: 1
           }}
        />
      </View>
    );
  }
}

