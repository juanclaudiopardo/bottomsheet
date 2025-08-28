import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BottomSheetFlashListModal } from '../components';

const dataFlashlist = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  // { id: '5', title: 'Item 5' },
  // { id: '6', title: 'Item 6' },
  // { id: '7', title: 'Item 7' },
  // { id: '8', title: 'Item 8' },
  // { id: '9', title: 'Item 9' },
  // { id: '10', title: 'Item 10' },
  // { id: '11', title: 'Item 11' },
  // { id: '12', title: 'Item 12' },
  // { id: '13', title: 'Item 13' },
  // { id: '14', title: 'Item 14' },
  // { id: '15', title: 'Item 15' },
  // { id: '16', title: 'Item 16' },
];

export default function Prueba() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleItemPress = useCallback((item: any, index: number) => {
    setSelectedItem(item);
    console.log('Item pressed:', item, 'at index:', index);
    // Opcionalmente cerrar el modal
    // bottomSheetModalRef.current?.dismiss();
  }, []);


  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title='Present Modal with FlashList'
        color='black'
      />
      {selectedItem && (
        <Text style={styles.selectedText}>
          Selected: {selectedItem.title}
        </Text>
      )}
      <BottomSheetFlashListModal
        ref={bottomSheetModalRef}
        data={dataFlashlist}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        maxHeight={400}
        onItemPress={handleItemPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginVertical: 10,
  },
});
