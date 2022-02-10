import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

// props 값을 이전에 받은 값이랑 비교하는 역할을 함.
// 부모 컴포넌트가 바뀌었지만 props 는 바뀌지 않는 경우 컴포넌트가 실행되지 않음.
export default React.memo(DemoOutput);

// React.memo 사용 비용 == 이전 props 값을 보관하고 비요하는 일.
// React.memo 사용 안하는 경우 == 컴포넌트 재평가

// 잘 사용하는 경우
// props 의 내용이 잘 안변해야 함.
// 컴포넌트 트리의 뿌리를 골라서 작업하는게 효율적. 자식 컴포넌트의 가지가 모두 잘라지게 끔.
