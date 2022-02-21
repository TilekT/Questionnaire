set -e

# ------------------------
near view dev-1645252136669-20614162324436 sayHi

# ------------------------
near call dev-1645252136669-20614162324436 greetingUser --account_id tilek.testnet

# ------------------------
near call dev-1645252136669-20614162324436 addToMyList '{"task":"Today is a great day!"}' --account_id tilek.testnet
#near call $CONTRACT deleteTask '{"task":1}' --account_id $OWNER

# ------------------------
near call dev-1645252136669-20614162324436 showMyTasks --account_id tilek.testnet
near call dev-1645252136669-20614162324436 getNumTasks --account_id tilek.testnet
