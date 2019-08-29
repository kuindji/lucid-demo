/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LucidColors from "./LucidColors.js";
import LucidFonts from "./LucidFonts.js";
import LucidLayers from "./LucidLayers.js";


const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView  style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>
            <View style={styles.topMenu}>
              <Text style={styles.topMenuText}>About</Text>
              <Text style={styles.topMenuText}>Products</Text>
              <Text style={styles.topMenuText}>Contacts</Text>
              <Text style={styles.topMenuText}>Sign in</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Lucid Demo DS</Text>
              <Text style={styles.sectionDescription}>
                Demo app showing how exported design tokens help
                quickly update a website and mobile apps.
              </Text>
              <Text style={styles.bodyText}>
                  Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate 
                    velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit 
                    anim id est laborum.
              </Text>
              <Text style={styles.bodyText}>
                  Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate 
                    velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit 
                    anim id est laborum.
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>(c) Lucid Demo DS</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: LucidColors.bodyColor
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {...LucidFonts.headerText, ...{
    color: LucidColors.headerTextColor,
  }},
  sectionDescription: {...LucidFonts.subheaderText, ...{
    marginTop: 10,
    color: LucidColors.subheaderTextColor,
  }},
  bodyText: {...LucidFonts.bodyText, ...{
    marginTop: 10,
    color: LucidColors.bodyTextColor
  }},
  highlight: {
    fontWeight: '700',
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 24
  },
  footerText: {
    ...LucidFonts.footerText,
    ...{
      color: LucidColors.footerTextColor
    }
  },
  topMenu: {
    ...LucidLayers.topMenu,
    ...{
      padding: 10,
      justifyContent: 'flex-end',
      flexDirection:'row'
    }
  },
  topMenuText: {
    ...LucidFonts.menuText,
    ...{
      color: LucidColors.menuTextColor,
      marginLeft: 10
    }
  }
});

export default App;
