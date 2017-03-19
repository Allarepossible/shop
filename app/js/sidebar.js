var FILTERS = [
    {
        name: 'Наличие в магазинах',
        id: 'shop',
        type: 'select',
        values: ['Во всех магазинах', 'В ближайшем ко мне магазине'],
        reset: false
    }, {
        name: 'Бренды',
        id: 'brands',
        type: 'checkbox',
        values: ['Lenovo', 'Apple', 'Samsung', 'Asus', 'Motorola'],
        reset: true
    }, {
        name: 'Цена',
        id: 'price',
        type: 'range-box',
        values: {
            'от': '0',
            'до': '10 000'
        },
        reset: false
    }, {
        name: 'Цвет',
        id: 'color',
        type: 'color',
        values: ['white', 'gray', 'black', 'blue', 'red', 'yellow', 'orange', 'green', 'skyblue', 'violet', 'pink', 'brown'],
        reset: true
    }, {
        name: 'Операционная система',
        id: 'oc',
        type: 'checkbox',
        values: ['Android', 'iOS', 'Windows Mobile', 'Symbian', 'Custom'],
        reset: true
    }
];

const Checkbox = React.createClass({
    getInitialState() {
        return this.props;
    },

    render() {
        return (
            <li className="filter__item">
                <input className="input input_type_checkbox" type="checkbox" id={this.state.name}/>
                <label htmlFor={this.state.name} className="label label_type_checkbox">{this.state.name}</label>
            </li>
        )
    }
});

const Select = React.createClass({
    getInitialState() {
        return this.props;
    },

    render() {
        return (
            <li className="filter__item filter__item_type_radio">
                <input className="input input_type_radio" type="radio" id={this.state.key} name="availible" />
                <label className="label label_type_radio" htmlFor={this.state.key}>{this.state.name}</label>
            </li>
        )
    }
});

const Color = React.createClass({
    getInitialState() {
        return this.props;
    },

    render() {
        return (
            <li className="color__item">
                <a className={"color__link " + this.state.name}></a>
                <span className="color__text">{this.state.name}</span>
            </li>
        )
    }
});

const RangeBox = React.createClass({
    render() {
        return (
            <div className="filter filter_type_price">
                <div className="price-range">
                    <div className="price-range__box">
                        <span className="price-range__text">от</span>
                        <input type="text" className="price-range__input" id="price-range1" />
                        <span className="price-range__text">до</span>
                        <input type="text" className="price-range__input" id="price-range2" />
                    </div>
                    <div className="price-range__slider"></div>
                </div>
            </div>
        )
    }
});

const Filter = React.createClass({
    getInitialState() {
        return {
            values: this.props.values
        };
    },

    render() {
        const opened = this.props.closedFilters.indexOf(this.props.id) === -1;
        const active = opened ? "active" : "";

        return (
            <li className="filters__item">
                <a href="#" className={"filter__title " + active} onClick={this.props.onTitleClick}>{this.props.name}
                <i className="manage-filter"></i></a>
                {
                    opened &&
                    <div className={"filter filter_type_" + this.props.id}>
                        <ul className="filter__list">
                            {
                                this.props.type === 'checkbox' &&
                                this.state.values.map((el, i) => {
                                    return <Checkbox
                                        key={i}
                                        name={el}
                                    />;
                                })
                            }
                            {
                                this.props.type === 'select' &&
                                this.state.values.map((el, i) => {
                                    return <Select
                                        key={i}
                                        name={el}
                                    />;
                                })
                            }
                            {
                                this.props.type === 'color' &&
                                this.state.values.map((el, i) => {
                                    return <Color
                                        key={i}
                                        name={el}
                                    />;
                                })
                            }
                            {
                                this.props.type === 'range-box' &&
                                <RangeBox type={this.props.type}/>
                            }
                            {
                                this.props.reset === true &&
                                <a href="#" className="reset-filter">Сбросить фильтр</a>
                            }
                        </ul>
                    </div>
                }
            </li>
        )
    }
});

const Filters = React.createClass({
    getInitialState() {
        return {
            allFilters: FILTERS,
            indexsOfClosedFilters: []
        };
    },

    onTitleClick(event, id) {
        const clickedTitleNumber = id.split('$')[1][0];
        const filterId = this.state.allFilters[clickedTitleNumber].id;
        const array = this.state.indexsOfClosedFilters;
        const position = array.indexOf(filterId);

        const newArray = position !== -1 ?
            array.filter((index) => index !== filterId) :
            array.concat(filterId);

        this.setState({indexsOfClosedFilters: newArray});
    },

    render() {
        return (
            <div className="filters">
                <ul className="filters__list">
                    {
                        this.state.allFilters.map((el, i) => {
                            return <Filter
                                key = {i}
                                name = {el.name}
                                id = {el.id}
                                type = {el.type}
                                values = {el.values}
                                reset = {el.reset}
                                closedFilters = {this.state.indexsOfClosedFilters}
                                onTitleClick = {this.onTitleClick}
                            />;
                        })
                    }
                </ul>
            </div>
        );
    }
});

ReactDOM.render(
    <Filters />,
    document.getElementById("sidebar")
);
