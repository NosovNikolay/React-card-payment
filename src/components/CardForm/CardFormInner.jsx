import { useCardContext } from '../CardContext';
import { useRef, useCallback } from 'react';

const CardForm = function () {
    const [cardNumber, setCardNumber] = useCardContext('cardNumber');
    const [cardName, setCardName] = useCardContext('cardName');
    const [cvv, setCvv] = useCardContext('cvv');
    const [expirationDate, setExpirationDate] = useCardContext('expirationDate');
    const [isHidden, setHidden] = useCardContext('isHidden');
    const [isFront, setIsFront] = useCardContext('isFront');
    const [, setCurrentFocusedElm] = useCardContext('curFocused');

    let cardElementsRef = {
        cardNumber: useRef(),
        cardName: useRef(),
        expirationDate: useRef()
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

    const separateInput = (key, value) => {
        let validator = new RegExp('[0-9 ]+');
        if (!value.match(validator) && value.length !== 0) return;
        if (
            (value.length === 4 || value.length === 9 || value.length === 14) &&
            key !== 'deleteContentBackward'
        )
            value = value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        setCardNumber(value);
    };

    return (
        <div className="card-form__inner">
            <div className="card-input">
                <label htmlFor="cardNumber" className="card-input__label">
                    Card Number
                </label>
                <input
                    ref={cardElementsRef.cardNumber}
                    onFocus={(e) => onCardFormInputFocus(e, 'cardNumber')}
                    onBlur={() => onCardInputBlur()}
                    value={cardNumber}
                    onChange={(event) => {
                        separateInput(event.nativeEvent.inputType, event.target.value);
                    }}
                    type="tel"
                    id="v-card-number"
                    maxLength="19"
                    data-card-field=""
                    autoComplete="off"
                    className="card-input__input"></input>
                <button
                    title="Show/Hide card number"
                    tabIndex="-1"
                    onClick={() => setHidden(!isHidden)}
                    className="card-input__eye"
                    disabled={cardNumber.length <= 5}></button>
            </div>
            <div className="card-input">
                <label htmlFor="cardName" className="card-input__label">
                    Card Name
                </label>
                <input
                    ref={cardElementsRef.cardName}
                    onFocus={(e) => onCardFormInputFocus(e, 'cardName')}
                    onBlur={() => onCardInputBlur()}
                    type="text"
                    id="v-card-name"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    data-card-field=""
                    autoComplete="off"
                    className="card-input__input"></input>
            </div>
            <div className="card-form__row">
                <div className="card-form__col">
                    <div className="card-form__group">
                        <label htmlFor="cardMonth" className="card-input__label">
                            Expiration Date
                        </label>
                        <select
                            ref={cardElementsRef.expirationDate}
                            onFocus={(e) => onCardFormInputFocus(e, 'expirationDate')}
                            onBlur={() => onCardInputBlur()}
                            onChange={(event) => {
                                setExpirationDate([event.target.value, expirationDate[1]]);
                            }}
                            id="v-card-month"
                            data-card-field=""
                            className="card-input__input -select">
                            <option value="" disabled="disabled">
                                Month
                            </option>
                            {[
                                '01',
                                '02',
                                '03',
                                '04',
                                '05',
                                '06',
                                '07',
                                '08',
                                '09',
                                '10',
                                '11',
                                '12'
                            ].map((item, index) => {
                                return <option value={item}>{item}</option>;
                            })}
                        </select>
                        <select
                            ref={cardElementsRef.expirationDate}
                            onFocus={(e) => onCardFormInputFocus(e, 'expirationDate')}
                            onBlur={() => onCardInputBlur()}
                            onChange={(event) => {
                                setExpirationDate([expirationDate[0], event.target.value]);
                            }}
                            id="v-card-year"
                            data-card-field=""
                            className="card-input__input -select">
                            <option value="" disabled="disabled">
                                Year
                            </option>
                            {[
                                '2022',
                                '2023',
                                '2024',
                                '2025',
                                '2026',
                                '2027',
                                '2028',
                                '2029',
                                '2030'
                            ].map((item, index) => {
                                return <option value={item}>{item}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="card-form__col -cvv">
                    <div className="card-input">
                        <label htmlFor="cardCvv" className="card-input__label">
                            CVV
                        </label>
                        <input
                            value={cvv}
                            onChange={(event) => {
                                let validator = new RegExp('[0-9 ]+');
                                if (
                                    !event.target.value.match(validator) &&
                                    event.target.value.length !== 0
                                )
                                    return;
                                setCvv(event.target.value);
                            }}
                            type="tel"
                            id="v-card-cvv"
                            maxLength="4"
                            data-card-field=""
                            autoComplete="off"
                            onFocus={() => setIsFront(!isFront)}
                            onBlur={() => setIsFront(!isFront)}
                            className="card-input__input"
                        />
                    </div>
                </div>
            </div>
            <button className="card-form__button">Submit</button>
        </div>
    );
};

export default CardForm;
