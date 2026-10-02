import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return;

        fetch(`https://api.exchangerate.fun/latest?base=${currency}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.rates || {});
            })
            .catch((error) => {
                console.log("Currency API Error:", error);
                setData({});
            });
    }, [currency]);

    return data;
}

export default useCurrencyInfo;