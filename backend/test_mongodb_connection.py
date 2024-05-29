import pymongo

def test_mongodb_connection():
    # MongoDB connection parameters
    mongo_host = 'localhost'
    mongo_port = 27017
    mongo_username = 'admin1'
    mongo_password = 'admin123'
    mongo_auth_source = 'admin'
    mongo_auth_mechanism = 'SCRAM-SHA-1'
    mongo_database = 'attendance'

    # MongoDB connection URI
    mongo_uri = f"mongodb://{mongo_username}:{mongo_password}@{mongo_host}:{mongo_port}/{mongo_database}?authSource={mongo_auth_source}&authMechanism={mongo_auth_mechanism}"

    try:
        # Connect to MongoDB
        client = pymongo.MongoClient(mongo_uri)
        db = client[mongo_database]

        # Print MongoDB server information
        server_info = db.command('serverStatus')
        print(f"Connected to MongoDB server: {server_info['host']}")

        # List collections in the database
        collections = db.list_collection_names()
        print("Collections in the database:")
        for collection in collections:
            print(collection)

        # Close the connection
        client.close()

        return True
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        return False

# Test the MongoDB connection
if test_mongodb_connection():
    print("MongoDB connection test successful")
else:
    print("MongoDB connection test failed")
