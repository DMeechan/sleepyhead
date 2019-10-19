import moment from 'moment';

export class SleepData {
    constructor(uuid) {
        //todo make the GET request here
        this.data = {
            "uuid": "abc",
            "username": "username",
            "createdAt": "2019/10/10:2200",
            "isSleeping": false,
            "sleepCycles": [
                {
                    "quality": 89,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/08:2200",
                    "finishedAt": "2019/10/09:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 46,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "temperature",
                            "value": 27,
                            "createdAt": "2019/10/26:0730"
                        },
                        {
                            "type": "luminosity",
                            "value": 80,
                            "createdAt": "2019/10/26:0730"
                        },
                        {
                            "type": "temperature",
                            "value": 35,
                            "createdAt": "2019/10/26:0740"
                        },
                        {
                            "type": "luminosity",
                            "value": 10,
                            "createdAt": "2019/10/26:0750"
                        }
                    ]
                },
                {
                    "quality": 23,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/07:2200",
                    "finishedAt": "2019/10/08:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 75,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/06:2200",
                    "finishedAt": "2019/10/07:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 62,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/05:2200",
                    "finishedAt": "2019/10/06:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 58,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/04:2200",
                    "finishedAt": "2019/10/05:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 10,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/03:2200",
                    "finishedAt": "2019/10/04:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 100,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/02:2200",
                    "finishedAt": "2019/10/03:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                },
                {
                    "quality": 20,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    },
                    "createdAt": "2019/10/01:2200",
                    "finishedAt": "2019/10/02:0700",
                    "readings": [
                        {
                            "type": "temperature",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        },
                        {
                            "type": "luminosity",
                            "value": 23,
                            "createdAt": "2019/10/26:0700"
                        }
                    ]
                }
            ]
        }
    }

    get_sleep_cycle(num_cycles_ago) {
        return new SleepCycle(this.data.sleepCycles[num_cycles_ago]);
    }

    get_last_n_cycles_chart_data(num_cycles) {
        let chart_data = {x: [], y: [0, 101]};
        for (let i = 0; i < num_cycles; i++) {
            let cycle = this.get_sleep_cycle(i);
            chart_data.x.unshift(parse_date(cycle.data.createdAt).format('dddd'));
            chart_data.y.unshift(cycle.data.quality);
        }
        return chart_data;
    }
}

export class SleepCycle {
    constructor(data) {
        this.data = data;
    }

    get_factor_quality(factor) {
        return this.data.factors.get(factor);
    }

    get_readings_for_factor(data, factor) {
        let readings = [];
        data.forEach(function(item, index) {
            if (item.type === factor) {
                readings.push(item);
            }
        });
        return readings;
    }

    get_chart_data_for_factors(factors) {
        let chart_data = {};
        let self = this;
        console.log(self);
        let all_readings = this.data.readings;
        factors.forEach(function(factor, index) {
            chart_data[factor] = [];
            self.get_readings_for_factor(all_readings, factor).forEach(function(reading, index) {
                chart_data[factor].push({
                    x: parse_date(reading.createdAt),
                    y: reading.value
                })
            });
        });

        return chart_data;
    }
}

function parse_date(date_str) {
    // "2019/10/10:2200"
    return moment(date_str, "YYYY/MM/DD:HHmm");
}
