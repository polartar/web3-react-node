import Web3 from 'web3';
import axios from "axios";

const Login = () => {
    const loginMetamask = async () => {
        let web3;
        let accounts;
        
        if (window.ethereum) {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
        }

        if(web3) {
            axios.get(process.env.REACT_APP_URL + "/token").then(async res => {
                const nonce = "Signature with Nonce" + res.data;
                const signature = await web3.eth.personal.sign(nonce, accounts[0]);

                axios.post(process.env.REACT_APP_URL + "/auth", {
                    address: accounts[0],
                    nonce: nonce,
                    signature
                }).then(auth => {
                    if (auth.data === "Hello World!") {
                        alert("Login success");
                    } else {
                        alert("Login failed")
                    }
                })
                .catch(() => {
                    alert("Login failed")
                });
            });
        }
    }

    return (
        <div>
            <button className='btnLogin' onClick={() => loginMetamask()}> Login</button>
        </div>
    )
}

export default Login;