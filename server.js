const prompt = require('prompt-sync')();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Customer = require('./models/customer');


dotenv.config();


const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
        await runApplication();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
        process.exit();
    }
};


const runApplication = async () => {
    console.log("Application is starting...");
    await startMenu();
};


const displayMenu = async () => {
    console.log("Welcome to the CRM");
    console.log("What would you like to do?");
    console.log("  1. Create a customer");
    console.log("  2. View all customers");
    console.log("  3. Update a customer");
    console.log("  4. Delete a customer");
    console.log("  5. Quit");

    const choice = prompt("Choice Number: ");
    return choice;
};


const startMenu = async () => {
    let choice;
    do {
        choice = await displayMenu();
        switch (choice) {
            case '1':
                await createCustomer();
                break;
            case '2':
                await viewCustomers();
                break;
            case '3':
                await updateCustomer();
                break;
            case '4':
                await deleteCustomer();
                break;
            case '5':
                console.log('Exiting application...');
                break;
            default:
                console.log('Invalid choice. Please select a valid option.');
                break;
        }
    } while (choice !== '5');
};


const createCustomer = async () => {
    const name = prompt("Enter customer Name: ");
    const age = prompt('Enter customer Age: ');
    const customerData = { name, age };

    try {
        const newCustomer = await Customer.create(customerData);
        console.log("New customer created:", newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
    }
};


const viewCustomers = async () => {
    try {
        const customers = await Customer.find({});
        console.log("All customers:", customers);
    } catch (error) {
        console.error("Error retrieving customers:", error);
    }
};


const updateCustomer = async () => {
    console.log('Fetching customer list...');
    await viewCustomers();

    const id = prompt('Enter Customer Id: ');
    const name = prompt('New Name: ');
    const age = prompt('New Age: ');

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, age }, { new: true });
        console.log("Updated customer:", updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
    }
};


const deleteCustomer = async () => {
    console.log('Fetching customer list...');
    await viewCustomers();

    const id = prompt('Enter customer Id: ');

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        console.log('Removed customer:', deletedCustomer);
    } catch (error) {
        console.error("Error deleting customer:", error);
    }
};


connectToDatabase();
