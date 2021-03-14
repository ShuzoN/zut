const zutool = require('../zutool');

test("zutoolから受け取ったjsonをフォーマットできること", () => {
    const formatted = [
        "8時 :sunny: 11.1℃ 1028.7hPa :ok:",
        "9時 :sunny: 13.6℃ 1028.1hPa :warning:",
        "10時 :sunny: 14.6℃ 1027.6hPa :warning:",
        "11時 :sunny: 16.9℃ 1026.8hPa :warning:",
        "12時 :sunny: 18.9℃ 1025.6hPa :warning:",
        "13時 :cloud: 20.3℃ 1024.7hPa :warning:",
        "14時 :sunny: 20.9℃ 1024.1hPa :warning:",
        "15時 :sunny: 20.5℃ 1024.5hPa :ok:",
        "16時 :cloud: 19.7℃ 1024.6hPa :ok:",
        "17時 :cloud: 18.6℃ 1023.9hPa :ok:",
        "18時 :cloud: 17.2℃ 1024.4hPa :ok:",
        "19時 :cloud: 15.9℃ 1025hPa :ok:",
        "20時 :sunny: 14.7℃ 1024.9hPa :ok:",
        "21時 :sunny: 13.8℃ 1024.6hPa :bomb:",
        "22時 :sunny: 13.2℃ 1023.9hPa :bomb:",
        "23時 :sunny: 12.8℃ 1023.6hPa :arrow_heading_down:",
    ];

    expect(zutool.formatter(zutoolJson)).toEqual(
        expect.arrayContaining(formatted)
    );
});

const zutoolJson = {
    place_name: '東京都杉並区',
    place_id: '115',
    prefectures_id: '13',
    dateTime: '2020-11-01 10',
    today: [
      {
        time: '0',
        weather: '100',
        temp: '10.6',
        pressure: '1027.7',
        pressure_level: '1'
      },
      {
        time: '1',
        weather: '100',
        temp: '9.9',
        pressure: '1027.8',
        pressure_level: '1'
      },
      {
        time: '2',
        weather: '100',
        temp: '9.2',
        pressure: '1027.4',
        pressure_level: '1'
      },
      {
        time: '3',
        weather: '100',
        temp: '9.0',
        pressure: '1027.5',
        pressure_level: '0'
      },
      {
        time: '4',
        weather: '100',
        temp: '8.1',
        pressure: '1027.4',
        pressure_level: '0'
      },
      {
        time: '5',
        weather: '100',
        temp: '7.6',
        pressure: '1027.6',
        pressure_level: '0'
      },
      {
        time: '6',
        weather: '100',
        temp: '7.3',
        pressure: '1027.7',
        pressure_level: '0'
      },
      {
        time: '7',
        weather: '100',
        temp: '9.3',
        pressure: '1027.9',
        pressure_level: '0'
      },
      {
        time: '8',
        weather: '100',
        temp: '11.1',
        pressure: '1028.7',
        pressure_level: '0'
      },
      {
        time: '9',
        weather: '100',
        temp: '13.6',
        pressure: '1028.1',
        pressure_level: '3'
      },
      {
        time: '10',
        weather: '100',
        temp: '14.6',
        pressure: '1027.6',
        pressure_level: '3'
      },
      {
        time: '11',
        weather: '100',
        temp: '16.9',
        pressure: '1026.8',
        pressure_level: '3'
      },
      {
        time: '12',
        weather: '100',
        temp: '18.9',
        pressure: '1025.6',
        pressure_level: '3'
      },
      {
        time: '13',
        weather: '200',
        temp: '20.3',
        pressure: '1024.7',
        pressure_level: '3'
      },
      {
        time: '14',
        weather: '100',
        temp: '20.9',
        pressure: '1024.1',
        pressure_level: '3'
      },
      {
        time: '15',
        weather: '100',
        temp: '20.5',
        pressure: '1024.5',
        pressure_level: '0'
      },
      {
        time: '16',
        weather: '200',
        temp: '19.7',
        pressure: '1024.6',
        pressure_level: '0'
      },
      {
        time: '17',
        weather: '200',
        temp: '18.6',
        pressure: '1023.9',
        pressure_level: '0'
      },
      {
        time: '18',
        weather: '200',
        temp: '17.2',
        pressure: '1024.4',
        pressure_level: '0'
      },
      {
        time: '19',
        weather: '200',
        temp: '15.9',
        pressure: '1025',
        pressure_level: '0'
      },
      {
        time: '20',
        weather: '100',
        temp: '14.7',
        pressure: '1024.9',
        pressure_level: '0'
      },
      {
        time: '21',
        weather: '100',
        temp: '13.8',
        pressure: '1024.6',
        pressure_level: '4'
      },
      {
        time: '22',
        weather: '100',
        temp: '13.2',
        pressure: '1023.9',
        pressure_level: '4'
      },
      {
        time: '23',
        weather: '100',
        temp: '12.8',
        pressure: '1023.6',
        pressure_level: '2'
      }
    ]
  };