import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for expenses
const expenses = [
    { id: '1', name: 'Groceries', amount: 50, date: '2024-10-07' },
    { id: '2', name: 'Rent', amount: 500, date: '2024-10-07' },
    { id: '3', name: 'Utilities', amount: 75, date: '2024-10-07' },
];

// Component to render individual expense item
const ExpenseItem = ({ item, onEdit, onDelete, onSelect }) => (
    <ThemedView style={styles.itemContainer}>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText>{item.amount} USD</ThemedText>
        <ThemedText>{item.date}</ThemedText>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
            <Button title="Edit" color="#0f0f0f" onPress={() => onEdit(item)} />
            <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
        </View>
    </ThemedView>
);

const Dashboard = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const totalIncome = 1000; // Replace with real data
    const totalExpense = 625; // Replace with real data

    // Function to handle edit action
    const handleEdit = (item) => {
        Alert.alert('Edit Item', `Editing ${item.name}`);
    };

    // Function to handle delete action
    const handleDelete = (id) => {
        Alert.alert('Delete Item', `Deleting item with id: ${id}`);
    };

    // Function to handle select action
    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Function to handle "Select All"
    const handleSelectAll = () => {
        if (selectedItems.length === expenses.length) {
            setSelectedItems([]); // Deselect all
        } else {
            setSelectedItems(expenses.map(item => item.id)); // Select all
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Summary Section */}
            <ThemedView style={styles.summaryContainer}>
                <ThemedText type="title">Today's Summary</ThemedText>
                <View style={styles.row}>
                    <ThemedText>Total Income: </ThemedText>
                    <ThemedText>{totalIncome} USD</ThemedText>
                </View>
                <View style={styles.row}>
                    <ThemedText>Total Expense: </ThemedText>
                    <ThemedText>{totalExpense} USD</ThemedText>
                </View>
            </ThemedView>



            {/* Expense List Section */}
            <ThemedText type="title" style={styles.sectionTitle}>Daily Activities </ThemedText>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                    />
                )}
                extraData={selectedItems}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    summaryContainer: {
        paddingTop: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    sectionTitle: {
        marginBottom: 8,
    },
    itemContainer: {
        padding: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    selectAllContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
});

export default Dashboard;
