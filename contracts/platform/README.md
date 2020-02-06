
# Immutable Wallet

Immutable Wallet is a smart contract wallet designed to onboard millions of users to Ethereum and true ownership through gaming. 

It will be the default wallet for Immutable games and products, and available on desktop, mobile, and in the browser.

It primarily uses the security model defined by Argent, where a group of 'backup' accounts are used to  recover control over a smart contract. However, where Argent focuses on social recovery, Immutable takes advantage of the presence of our applications on multiple platforms to get users to use a multi-factor authentication flow which we believe better conforms to users' expectations. 

In general, users should make their 'controller' device their phone, as it will generally have the best sandboxing and security protections. 

## Concepts

### Modules

Modules are contracts which are authorised to send transactions on behalf of the wallet. They are split by functionality to enable simpler auditing and allow users to choose only the functionality they require. 

### Limiters

Limiters are contracts which define restrictions for not just one module, but for every module. 

The following limiters are available: LockLimiter. 

### Delegates

Delegates are contracts to which certain incoming transactions are delegated. This is helpful for implementing custom fallback functions and ensuring that the wallet can be compliant with interfaces which expect it to provide certain methods. 

## Principles

### Security



### Simplicity 

Another core goal of the Immutable wallet is to be as simple as possible - we want (advanced) users to be able to audit the code themselves before trusting the wallet. This means no absurd contract hierarchies, minimal Solidity assembly. 

### Extensibility

