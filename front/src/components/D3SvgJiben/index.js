import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Circle from './Circle.js';
import Historgram from './Historgram.js';


import style from './index.less'

export default class D3Array extends Component {
    static defaultProps = {
        classNmae: '',
        onSubmit: () => { }
    };
    static propTypes = {
        classNmae: PropTypes.string,
        onSubmit: PropTypes.func
    };
    state = {
        active: 'static'
    };

    render() {
        function callback(key) {
            console.log(key);
        }
        const TabPane = Tabs.TabPane;
        const arrfun = [{ name: "d3.min", funname: "min" }]
        return (
            <div>
        
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="原" key="1" className={style.leftPanel}>
                            <Circle></Circle>
                        </TabPane>
                        <TabPane tab="柱形" key="2" className={style.leftPanel}>
                            <Historgram></Historgram>
                        </TabPane>
                        
                    </Tabs>
               
            </div>
        );
    }

}
