const app = Vue.createApp({
  // data, methods: 예약
  data() {
    return {
      courseGoalA: 'Finish the course and learn Vue!',
      courseGoalB: 'Master Vue and build amazing apps!',
      vueLink: 'https://vuejs.org'
    }
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        // vue 여기서 약간의 마술을 함.
        // 데이터 메서드를 반환하는 이 data 객체에서 전역 Vue 인스턴스 객체로 병합한다.
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});

app.mount('#user-goal');

