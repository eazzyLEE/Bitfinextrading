import { FlatList as RNFlatList } from 'react-native';

const FlatList = ({
  data,
  transactionType,
  handleFetchMoreTransaction,
  handlePullToRefresh,
  isFetchingMore,
  isRefreshing,
  openBottomSheet,
  emptyComponent,
  shouldHeaderShow = true,
  showsVerticalScrollIndicator = true,
}) => {
  return (
    <RNFlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={styles.flatList}
      data={data}
      onEndReached={handleFetchMoreTransaction}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handlePullToRefresh}
          tintColor={Colors.DarkBlue}
        />
      }
      keyExtractor={item =>
        item.reference_code || item.reference || item.transactionReference
      }
      renderItem={({ item }) => (
        <TransactionListItem
          transactionType={transactionType}
          item={item}
          openBottomSheet={openBottomSheet}
        />
      )}
      ListEmptyComponent={() =>
        emptyComponent || (
          <View style={styles.noTransaction}>
            <Image
              source={placeholderEmpty}
              style={styles.image}
              resizeMode="contain"
            />
            <HeaderText
              title={'No Transactions yet'}
              style={styles.noHistoryText}
            />
            <RegularText
              title="Any transactions you make will appear here. Let’s start trading!"
              style={styles.noHistorySubText}
            />
          </View>
        )
      }
      ListHeaderComponent={
        shouldHeaderShow
          ? () =>
              !!data &&
              data.length > 0 && (
                <View style={styles.transactionsHeader}>
                  <SemiBoldText
                    title="Recent Transactions"
                    style={styles.transactionsHeaderTitle}
                  />
                  {isRefreshing ? (
                    <RegularText
                      title="updating..."
                      style={styles.transactionsHeaderUpdatedTime}
                    />
                  ) : null}
                </View>
              )
          : () => <View />
      }
      ListFooterComponent={() =>
        isFetchingMore && <Spinner size="small" color={Colors.DarkBlue} />
      }
      ListFooterComponentStyle={{ marginTop: hp(20) }}
    />
  );
};
