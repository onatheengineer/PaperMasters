import { render, screen } from "@testing-library/react";
import {Navbar} from './Navbar'

test("connect button to MetaMast or WalletConect", ()=>{
    render(<Navbar/>)
    const connectWallet = screen.getByRole('button', {name: 'Connect Wallet'});
    expect(connectWallet).toBeInTheDocument()
});