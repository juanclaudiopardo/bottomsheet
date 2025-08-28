import {
  BottomSheetBackdrop,
  BottomSheetFlashList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetFlashListModalProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  keyExtractor: (item: any, index: number) => string;
  estimatedItemSize: number;
  maxHeight: number;
  onSheetChanges?: (index: number) => void;
  onItemPress?: (item: any, index: number) => void;
}

export const BottomSheetFlashListModal = forwardRef<
  BottomSheetModal,
  BottomSheetFlashListModalProps
>(({ data, renderItem, keyExtractor, estimatedItemSize, maxHeight, onSheetChanges, onItemPress }, ref) => {
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => {
    const handleHeight = 24;
    const contentHeight = data.length * estimatedItemSize + handleHeight + insets.bottom;
    const dynamicHeight = Math.min(contentHeight, maxHeight);
    return [dynamicHeight];
  }, [data.length, estimatedItemSize, maxHeight, insets.bottom]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      onChange={onSheetChanges}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <BottomSheetFlashList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => {
            const ItemComponent = renderItem({ item, index });
            return onItemPress ? (
              <TouchableOpacity onPress={() => onItemPress(item, index)}>
                {ItemComponent}
              </TouchableOpacity>
            ) : (
              ItemComponent
            );
          }}
          estimatedItemSize={estimatedItemSize}
        />
      </View>
    </BottomSheetModal>
  );
});

BottomSheetFlashListModal.displayName = 'BottomSheetFlashListModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});