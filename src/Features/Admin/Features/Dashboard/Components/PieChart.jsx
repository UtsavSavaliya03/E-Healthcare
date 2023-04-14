import React from 'react'
import { ResponsivePie } from '@nivo/pie'

export default function PieChart(props) {

  function calculateWeightage(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return arr.map(num => ((num / sum) * 100).toFixed(2));
  }

  let userWeightage = calculateWeightage(props.usersData)

  let data = [
    {
      "id": "Hospitals",
      "label": "Hospitals",
      "value": userWeightage[0],
      "color": "hsl(340, 70%, 50%)"
    },
    {
      "id": "Laboratories",
      "label": "Laboratories",
      "value": userWeightage[1],
      "color": "hsl(162, 70%, 50%)"
    },
    {
      "id": "Doctors",
      "label": "Doctors",
      "value": userWeightage[2],
      "color": "hsl(88, 70%, 50%)"
    },
    {
      "id": "Patients",
      "label": "Patients",
      "value": userWeightage[3],
      "color": "hsl(224, 70%, 50%)"
    }
  ]

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: 'set2' }}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
   
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}