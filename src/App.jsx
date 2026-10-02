import { InputBox } from "./Components";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { useState } from "react";

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);

    const options = [...new Set([from, to, ...Object.keys(currencyInfo || {})])]

    const swap = () => {
        setFrom(to);
        setTo(from);

        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        const rate = currencyInfo?.[to];

        if (rate !== undefined) {
            setConvertedAmount(Number(amount) * Number(rate));
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://www.currencytransfer.com/wp-content/uploads/2025/03/blog-post-image-globalcurrency1.jpg')",
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >

                        {/* FROM */}
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) =>
                                    setFrom(currency)
                                }
                                selectCurrency={from}
                                onAmountChange={(amount) =>
                                    setAmount(amount)
                                }
                            />
                        </div>

                        {/* SWAP */}
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>

                        {/* TO */}
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) =>
                                    setTo(currency)
                                }
                                selectCurrency={to}
                                amountDisable={true}
                            />
                        </div>

                        {/* CONVERT BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                        >
                            Convert {from.toUpperCase()} to{" "}
                            {to.toUpperCase()}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;