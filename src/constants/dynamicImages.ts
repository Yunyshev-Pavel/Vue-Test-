export const DYNAMIC_IMAGES = {
  MEASURE: Array.from(
    { length: 9 },
    (_, i) => `../../public/images/measure/power_${i}.png`,
  ),
  ROBOT: {
    DEFAULT: '../../public/images/robot/robot_1.png',
    WINNER: '../../public/images/robot/robot_3.png',
    LOOSER: '../../public/images/robot/robot_2.png',
  },
  BUTTON: {
    ACTIVE: '../../public/images/button/button_active.png',
    INACTIVE: '../../public/images/button/button.png',
  },
} as const
