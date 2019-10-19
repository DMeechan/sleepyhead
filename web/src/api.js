class SleepData {
    constructor(uuid) {
        //todo make the GET request here
        this.data = {
            "uuid": "abc",
            "username": "username",
            "createdAt": "2019/10/10:2200",,
            "isSleeping": false
            "sleepCycles": [
                {
                    "quality": 89,
                    "factors": {
                        "light": 92,
                        "temperature": 63
                    }
                    "createdAt": "2019/10/25:2200",
                    "finishedAt": "2019/10/26:0700"
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
        return SleepCycle(this.data.sleepCycles[num_cycles_ago]);
    }
}

class SleepCycle {
    constructor(data) {
        this.data = data;
    }

    get_factor_quality(factor) {
        return this.data.factors.get(factor);
    }

    get_readings_for_factor(factor) {
        let readings = [];
        this.data.forEach(function(item, index) {
            if (item.type == factor) {
                readings.push(item);
            }
        });
        return readings;
    }

    get_chart_data_for_factor(factor) {
        let chart_data = [];
        get_readings_for_factor(factor).forEach(function(reading, index) {
            chart_data.push({
                t: new Date(reading.createdAt),
                y: reading.value
            })
        });
        return chart_data;
    }
}
