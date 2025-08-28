import {
  BottomSheetBackdrop,
  BottomSheetFlashList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Datos de ejemplo
const generateData = (count: number) =>
  Array(count)
    .fill(0)
    .map((_, index) => ({
      id: `item-${index}`,
      title: `Item ${index + 1}`,
      description: `Descripción del item ${index + 1}`,
    }));

export default function Index() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');

  // Datos para la lista
  const data = useMemo(() => generateData(50), []);

  // Calcular snapPoints dinámicamente - MEJOR PRÁCTICA para v5
  const snapPoints = useMemo(() => {
    const itemHeight = 80; // estimatedItemSize
    const handleHeight = 24; // altura del handle por defecto
    const contentHeight =
      data.length * itemHeight + handleHeight + insets.bottom;
    const maxHeight = screenHeight * 0.5; // 50% máximo

    // Usar el menor entre el contenido necesario y el máximo permitido
    const dynamicHeight = Math.min(contentHeight, maxHeight);

    return [dynamicHeight];
  }, [data.length, screenHeight, insets.bottom]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior='close'
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title='Present Modal with FlashList'
        color='black'
      />
      <Link href={'/prueba'} asChild>
        <Button title='navigate to prueba' />
      </Link>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        enableDynamicSizing={false} // Desactivado para control manual
        index={0}
      >
        <View style={{ flex: 1, paddingBottom: insets.bottom }}>
          <BottomSheetFlashList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            estimatedItemSize={80}
          />
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});
