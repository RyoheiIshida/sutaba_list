import { areaFeelLabels, toiletCongestionLabels, stationDistanceLabels, cigaretteSmellLabels } from './storeLabels';

export const areaFeelOptions = [
  { value: 'large', label: areaFeelLabels.large },
  { value: 'medium', label: areaFeelLabels.medium },
  { value: 'small', label: areaFeelLabels.small },
];

export const toiletCongestionOptions = [
  { value: 'low', label: toiletCongestionLabels.low },
  { value: 'medium', label: toiletCongestionLabels.medium },
  { value: 'high', label: toiletCongestionLabels.high },
];

export const stationDistanceOptions = [
  { value: 'near', label: stationDistanceLabels.near },
  { value: 'medium', label: stationDistanceLabels.medium },
  { value: 'far', label: stationDistanceLabels.far },
];

export const cigaretteSmellOptions = [
  { value: 'none', label: cigaretteSmellLabels.none },
  { value: 'light', label: cigaretteSmellLabels.light },
  { value: 'medium', label: cigaretteSmellLabels.medium },
  { value: 'heavy', label: cigaretteSmellLabels.heavy },
];

export const booleanOptions = [
  { value: 'true', label: 'あり' },
  { value: 'false', label: 'なし' },
];