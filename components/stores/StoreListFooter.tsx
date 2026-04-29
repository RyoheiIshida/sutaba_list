interface StoreListFooterProps {
  storesCount: number;
  viewType: 'map' | 'list';
  selectedStoreName: string | null;
}

export function StoreListFooter({ storesCount, viewType, selectedStoreName }: StoreListFooterProps) {
  const getFooterText = () => {
    let text = `${storesCount}件の店舗が見つかりました`;

    if (viewType === 'map') {
      if (selectedStoreName) {
        text += ` - ${selectedStoreName}を選択中`;
      } else {
        text += '（マップ上のピンをクリックで詳細を確認できます）';
      }
    } else if (viewType === 'list') {
      text += '（カードをクリックでマップを表示）';
    }

    return text;
  };

  return (
    <div className="mt-8 text-center">
      <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse"></div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {getFooterText()}
        </p>
      </div>
    </div>
  );
}