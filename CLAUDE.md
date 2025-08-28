# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo project focused on implementing bottom sheet functionality using `@gorhom/bottom-sheet`. The project demonstrates advanced bottom sheet patterns with FlashList integration and dynamic sizing.

## Development Commands

### Core Development
- `npm start` or `expo start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator  
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint linting

### Project Reset
- `npm run reset-project` - Move current code to app-example/ and create blank app/ directory

## Architecture

### Navigation & Routing
- Uses **Expo Router** with file-based routing in the `app/` directory
- Stack navigation configured in `app/_layout.tsx`
- Root layout wrapped with required providers:
  - `GestureHandlerRootView` for gesture handling
  - `BottomSheetModalProvider` for bottom sheet context

### Bottom Sheet Implementation
- Primary implementation uses `@gorhom/bottom-sheet` library
- Key components integrated:
  - `BottomSheetModal` - Main modal component
  - `BottomSheetFlashList` - Optimized list rendering using Shopify FlashList
  - `BottomSheetBackdrop` - Custom backdrop with close behavior
- Dynamic snap points calculation based on content and screen dimensions
- SafeArea integration for proper insets handling

### Key Dependencies
- **@gorhom/bottom-sheet** - Bottom sheet implementation
- **@shopify/flash-list** - High-performance list component
- **react-native-gesture-handler** - Gesture system
- **react-native-reanimated** - Animation library
- **expo-router** - File-based routing

## Code Patterns

### Bottom Sheet Best Practices
- Use `useMemo` for snapPoints calculation to prevent unnecessary re-renders
- Implement `useCallback` for render functions and event handlers
- Calculate dynamic heights considering safe area insets
- Use `enableDynamicSizing={false}` with manual snapPoints for precise control

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured with `@/*` pointing to root
- Expo TypeScript base configuration extended

## Project Structure

```
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx           # Main screen with bottom sheet demo
└── prueba.tsx          # Secondary test screen
assets/                 # Images and fonts
```

## Platform Support
- iOS (tablet support enabled)
- Android (edge-to-edge enabled, adaptive icon configured)
- Web (Metro bundler, static output)
- Expo New Architecture enabled