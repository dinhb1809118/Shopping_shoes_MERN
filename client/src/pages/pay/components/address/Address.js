import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './address.css';
import { useNavigate } from 'react-router-dom';
import { activeAddress, addAddress, checkedAddress, deleteAddress, getToAddressCity, getToAddressCityEmpty, getToAddressUser, getToAddressWars, getToAddressWarsEmpty, unactiveAddress } from '../../../../redux/apiRequest';
function Address() {
    const user = useSelector(state => state.user.login?.currentUser);
    const arrAdd = useSelector(state => state.pay.getToAddressUser.currentAddress?.address);
    console.log(arrAdd);
    const province = useSelector(state => state.pay.getToAddress.currentAddress);
    const city = useSelector(state => state.pay.getToAddressCity.currentAddressCity?.districts);
    const wars = useSelector(state => state.pay.getToAddressWars.currentAddressWars?.wards);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [provincesState, setProvincesState] = useState('');
    const [cityState, setCityState] = useState('');
    const [warsState, setWarsState] = useState('');
    const [details, setDetails] = useState('');
    const handleShowModel = () => {
        const elementModel = document.querySelector('.modal-app');
        elementModel.classList.add('open');
    }
    const handleUnShow = () => {
        const elementModel = document.querySelector('.modal-app');
        elementModel.classList.remove('open');
    }

    const handleSubmit = async () => {
        const userid = user._id;
        const provincesAddress = provincesState;
        const cityAddress = cityState;
        const warsAddress = warsState;
        const detailsAddress = details;
        const address = {
            userid,
            name,
            phone,
            provincesAddress,
            cityAddress,
            warsAddress,
            detailsAddress
        }
        if (userid && provincesAddress && cityAddress && warsAddress && detailsAddress) {
            await addAddress(dispatch, navigate, address);
            handleUnShow();
            getToAddressUser(dispatch, navigate, userid);
        } else {
            alert("vui l??ng ??i???n ?????y ????? th??ng tin");
        }

    }
    const handleProvinces = (e) => {
        const str = e.target.value;
        const arr = str.split(",");
        const code = arr[0];
        const nameProvinces = arr[1];
        getToAddressCityEmpty(dispatch, navigate);
        getToAddressWarsEmpty(dispatch, navigate);
        setCityState('');
        setWarsState('');
        getToAddressCity(dispatch, navigate, code);
        setProvincesState(nameProvinces);
    }
    const handleCity = (e) => {
        const str = e.target.value;
        const arr = str.split(",");
        const code = arr[0];
        const nameCity = arr[1];
        getToAddressWars(dispatch, navigate, code);

        setCityState(nameCity);
    }
    const handleWars = (e) => {
        const str = e.target.value;
        const arr = str.split(",");
        const nameWars = arr[1];
        setWarsState(nameWars);
    }
    const handleDeleteAddress = (e) => {
        const userid = user._id;
        const idAddress = e.target.id;
        console.log(e.target.id);
        if (confirm("B???n c?? ch???c mu???n x??a.") == true) {
            deleteAddress(dispatch, navigate, userid, idAddress);
            getToAddressUser(dispatch, navigate, userid);
        }
    }
    const handleChecked = (e) => {
        const userid = user._id;
        const idAddress = e.target.value;
        // console.log(e.target.value);
        unactiveAddress(dispatch, navigate, userid);
        activeAddress(dispatch, navigate, userid, idAddress);
        checkedAddress(dispatch, navigate, userid);
    }
    const userid = user._id;
    unactiveAddress(dispatch, navigate, userid);
    return (
        <div className="">
            <div class="container-pay-big">
                <div class="container-pay-address">
                    <div class="container-pay-address-space"></div>
                    <div class="container-pay-address-fex">
                        <div class="container-pay-address-heading">
                            <div class="container-pay-address-heading-icon">
                                <i class="fal fa-map-marker-alt container-pay-address-heading-icon"></i>
                            </div>
                            <div class="container-pay-address-heading-text">
                                ?????a ch??? nh???n h??ng
                            </div>
                        </div>
                        <div class="container-pay-address-button-add">
                            <button onClick={handleShowModel} class="container-pay-address-button-add-btn">
                                <div class="container-pay-address-button-add-icon">
                                    <i class="fal fa-plus"></i>
                                </div>
                                <div class="container-pay-address-button-add-text">
                                    Th??m ?????a ch??? m???i
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="container-pay-address-list">
                        <div class="container-pay-address-list-big">
                            {
                                arrAdd?.map(arrAdds => {
                                    return (
                                        <div key={arrAdds._id} class="container-pay-address-list-item">
                                            <div className="container-pay-address-list-item__flex">
                                                <div class="container-pay-address-list-input">
                                                    <input onClick={handleChecked} type="radio" name="addressorders" value={arrAdds._id}
                                                        class="container-pay-address-list-input-check" />
                                                </div>
                                                <div class="container-pay-address-list-name">
                                                    <div class="container-pay-address-list-name-customers">
                                                        <b>{arrAdds.name}  &nbsp;{arrAdds.phone} </b>
                                                    </div>
                                                </div>
                                                <div class="container-pay-address-list-address">
                                                    {arrAdds.details}, {arrAdds.wars}, {arrAdds.citys}, {arrAdds.provinces}
                                                </div>
                                            </div>
                                            <div className="icon__delete" id={arrAdds._id}>
                                                <i onClick={handleDeleteAddress} id={arrAdds._id} class="fa-solid fa-circle-minus icon__delete__icon"></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div class="modal-app">
                    <div class="app-pay">
                        <div class="app-pay-big">
                            <div class="app-pay-heading">?????a ch??? m???i</div>
                            <div class="app-pay-information">
                                <input value={name} onChange={e => setName(e.target.value)} type="text" name="address-name" placeholder="H??? v?? t??n" class="app-pay-information-name" required />
                                <input value={phone} onChange={e => setPhone(e.target.value)} type="text" name="address-phone" placeholder="S??? ??i???n tho???i" class="app-pay-information-phone" required />
                            </div>
                            <div class="app-pay-address">
                                <div class="app-pay-address-flex">
                                    <select onChange={handleProvinces} label="" class="app-pay-address-city" required="">
                                        <option class="app-pay-address-city-value" label="" value="">Ch???n T???nh/Th??nh ph???</option>
                                        {province.map(provinces => {
                                            return (
                                                <option key={provinces} class="app-pay-address-city-value" value={[`${provinces.code}`, `${provinces.name}`]} > {provinces.name}</option>
                                            )
                                        })}
                                    </select>
                                    <select onChange={handleCity} name="calc_shipping_district" class="app-pay-address-city" required="">
                                        <option class="app-pay-address-city-value" value="">Ch???n Qu???n/Huy???n</option>
                                        {city?.map(citys => {
                                            return (
                                                <option key={citys.code} id={citys.name} class="app-pay-address-district-value" value={[citys.code, citys.name]}>{citys.name}</option>
                                            )
                                        })}
                                    </select>
                                    <select onChange={handleWars} name="calc_shipping_district" class="app-pay-address-city" required="">
                                        <option class="app-pay-address-city-value" value="">Ch???n Ph?????ng/X??</option>
                                        {wars?.map(warss => {
                                            return (
                                                <option key={warss.code} id={warss.name} class="app-pay-address-district-value" value={[warss.code, warss.name]}>{warss.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="app-pay-address-details">
                                <input value={details} onChange={e => setDetails(e.target.value)} type="text" name="address-district-details" placeholder="?????a ch??? c??? th???" required class="app-pay-address-details-check" />
                            </div>
                            <div class="app-pay-button">
                                <div onClick={handleUnShow} class="app-pay-btn-back">Tr??? L???i</div>
                                <button onClick={handleSubmit} name="addressadd" class="app-pay-btn-submit">Ho??n Th??nh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Address;