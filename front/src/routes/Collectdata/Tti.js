import React, { Component, Fragment } from "react";
// import D3Array from 'components/D3Array';
// import styles from './Array.less';
import { connect } from 'dva';
import styles from './Tti.less';
import { Menu, Dropdown, Icon ,Select} from 'antd';
import {
    // Row,
    // Col,

    Card,

} from 'antd';
import {
    BaseBar,
    TimelineChart,
    BaseLine
} from 'components/Charts';

const { Option } = Select;

@connect(({ tti, loading }) => ({
    tti,
    loading: loading.effects['tti/fetch'],
}))
class Tti extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'tti/fetch',
            payload:{
                days:1
            }
        });
    }

    render() {
        const { tti, loading } = this.props;
        const callback = (e, h, cm) =>{
            console.log(e, h, cm);
            this.props.dispatch({
                type: 'tti/fetch',
                payload:{
                    days:e
                }
            });
        }

        console.log(this.props)
        let {daysData} =tti;
        const {
            timesData,
            // offlineChartData,
            ttiData,
        } = tti;
        let options = [];
        tti.daysData.arr.map((item) => {
            if (item == 1) {
                options.push(<Option key={item} value="1">今天</Option>)
            } else {
                options.push(<Option key={item} value={item}>过去{item}天</Option>)
            }
        });
        return (<Fragment>
            <Card
                loading={loading}
                className={styles.offlineCard}
                bordered={false}
                bodyStyle={{ padding: '0 0 32px 0' }}
                style={{ marginTop: 32 }}
            >
                {ttiData.length > 0 ?
                    (<div style={{ padding: '0 24px' }}>

                        <BaseLine
                            height={400}
                            data={ttiData}
                            titleMap={{ y1: 'Tti (第一次小于5s 第二次小于2s)', y2: 'Tti' }}
                            days={daysData.selected}
                        />

                    </div>) : 0
                }
            </Card>
            <Card>
            <BaseBar height={295} title="tti时间分布" data={timesData} />

            </Card>
            <Select defaultValue={daysData.selected} style={{ width: 100 }} onChange={callback}> 
               {options}
              </Select>
              <div>统计pc mobile 分布</div>
        </Fragment>)

    }
}
export default Tti