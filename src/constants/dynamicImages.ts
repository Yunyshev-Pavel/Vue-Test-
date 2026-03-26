export const DYNAMIC_IMAGES = {
  MEASURE: Array.from(
    { length: 9 },
    (_, i) => `/images/measure/power_${i}.png`,
  ),
  ROBOT: {
    DEFAULT: '/images/robot/robot_1.png',
    WINNER: '/images/robot/robot_3.png',
    LOOSER: '/images/robot/robot_2.png',
  },
  BUTTON: {
    ACTIVE: '/images/button/button_active.png',
    INACTIVE: '/images/button/button.png',
  },
} as const
