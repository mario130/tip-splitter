import { Image, Platform, StatusBar, TouchableOpacity, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useEffect, useState } from 'react';

const MyStatusBar = () => (
  <View className="bg-[#C5E4E7] h-[StatusBar.currentHeight]">
    <SafeAreaView className="flex-1">
      <StatusBar translucent backgroundColor="#C5E4E7" barStyle={'default'} />
    </SafeAreaView>
  </View>
);

const TIPS = [5, 10, 15, 20, 25, 50];

export default function HomeScreen() {
  const [bill, setBill] = useState<string>();
  const [selectedTip, setSelectedTip] = useState(10);
  const [people, setPeople] = useState<string>();
  const [totalPerPerson, setTotalPerPerson] = useState<number>();
  const [grandTotal, setGrandTotal] = useState<number>();

  const handleInputChange = (value: string, setter: (value: string) => void) => {
    const sanitizedPrice = value.replace(/[^0-9.]/g, '');
    setter(sanitizedPrice);
  };

  useEffect(() => {
    if (bill && selectedTip && people) {
      const tipAmount = (Number(bill) * selectedTip) / 100;
      const totalAmount = Number(bill) + tipAmount;
      const totalPerPerson = totalAmount / Number(people);

      setTotalPerPerson(totalPerPerson);
      setGrandTotal(totalAmount);
    }
  }), [bill, selectedTip, people];

  const reset = () => {
    setBill('');
    setSelectedTip(10);
    setPeople('');
    setTotalPerPerson(undefined);
    setGrandTotal(undefined);
  }

  return (
    <>
      <MyStatusBar />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#C5E4E7', dark: '#1D3D47' }}
        headerImage={
          <Image source={require('@/assets/images/SPLITTER.png')} />
        }>

        <View className='mb-8'>
          <ThemedText type="subtitle">Bill</ThemedText>
          <TextInput
            className='bg-[#F3F9FA] rounded-md py-3 px-4 text-right text-2xl font-bold text-primary'
            keyboardType='numeric'
            inputMode='numeric'
            placeholder='9.99'
            value={bill || ''}
            placeholderTextColor={'#9EBBBD'}
            onChangeText={(price) => handleInputChange(price, setBill)}
            maxLength={5}
          />
          <TabBarIcon name={'logo-usd'} color="#9EBBBD" className='absolute bottom-4 left-4' />
        </View>

        <View className='mb-8'>
          <ThemedText type="subtitle">Number of People</ThemedText>
          <TextInput
            className='bg-[#F3F9FA] rounded-md py-3 px-4 text-right text-2xl font-bold text-primary'
            keyboardType='numeric'
            inputMode='numeric'
            placeholder='3'
            value={people || ''}
            placeholderTextColor={'#9EBBBD'}
            onChangeText={(numOfPeople) => handleInputChange(numOfPeople, setPeople)}
            maxLength={2}
          />
          <TabBarIcon name={'person'} color="#9EBBBD" className='absolute bottom-4 left-4' />
        </View>

        <View className='mb-8'>
          <ThemedText type="subtitle">Select Tip %</ThemedText>
          <View className="flex-row flex-wrap justify-between">
            {TIPS.map((tip) => (
              <TouchableOpacity
                key={tip}
                className={`w-[48%] p-3 mb-4 rounded-lg items-center ${selectedTip === tip ? 'bg-secondary' : 'bg-primary'
                  }`}
                onPress={() => setSelectedTip(tip)}
              >
                <ThemedText className={`font-bold text-3xl ${selectedTip === tip ? 'text-primary' : 'text-white'}`}>
                  {tip}%
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="bg-primary rounded-2xl p-6 pt-10">
          <View className="flex-row justify-between mb-4">
            <View>
              <ThemedText className="text-white font-bold text-lg">Tip Amount</ThemedText>
              <ThemedText className="text-[#7F9C9F]">/ person</ThemedText>
            </View>
            <ThemedText className="text-secondary font-bold text-4xl">
              {totalPerPerson ? `$${totalPerPerson?.toFixed(2)}` : '...'}
            </ThemedText>
          </View>

          <View className="flex-row justify-between mb-8">
            <View>
              <ThemedText className="text-white font-bold text-lg">Total</ThemedText>
              <ThemedText className="text-[#7F9C9F]">/ person</ThemedText>
            </View>
            <ThemedText className="text-secondary font-bold text-4xl">
              {grandTotal ? `$${grandTotal?.toFixed(2)}` : '...'}
            </ThemedText>
          </View>

          <TouchableOpacity onPress={reset} className="bg-secondary rounded-md py-3 items-center">
            <ThemedText className="text-primary font-bold text-lg">RESET</ThemedText>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    </>
  );
}