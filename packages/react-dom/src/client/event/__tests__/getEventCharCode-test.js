/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

'use strict';

// TODO: can we express this test with only public API?
var getEventCharCode = require('getEventCharCode');

describe('getEventCharCode', () => {
  var React;
  var ReactDOM;
  var ReactTestUtils;
  var container;

  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
    ReactTestUtils = require('react-dom/test-utils');
    container = document.createElement('div');
  });

  describe('when charCode is present in nativeEvent', () => {
    describe('when charCode is 0 and keyCode is 13', () => {

      it('returns 13', () => {
        function checkCharCode(e) {
          expect(e.charCode).toBe(13);
        }

        var component = ReactDOM.render(<input type="text" onKeyPressCapture={checkCharCode} />, container);

        var node = ReactDOM.findDOMNode(component);

        ReactTestUtils.Simulate.keyPress(node, {
          charCode: 0,
          keyCode: 13,
        });
      });
    });

    describe('when charCode is not 0 and/or keyCode is not 13', () => {
      describe('when charCode is 32 or bigger', () => {
        it('returns charCode', () => {
          function checkCharCode(e) {
            expect(e.charCode).toBe(32);
          }

          var component = ReactDOM.render(<input type="text" onKeyPressCapture={checkCharCode} />, container);

          var node = ReactDOM.findDOMNode(component);

          ReactTestUtils.Simulate.keyPress(node, {
            charCode: 32,
          });

        });
      });

      describe('when charCode is smaller than 32', () => {
        describe('when charCode is 13', () => {
          it('returns 13', () => {
            function checkCharCode(e) {
              expect(e.charCode).toBe(13);
            }

            var component = ReactDOM.render(<input type="text" onKeyPressCapture={checkCharCode} />, container);

            var node = ReactDOM.findDOMNode(component);

            ReactTestUtils.Simulate.keyPress(node, {
              charCode: 13,
            });
          });
        });

        describe('when charCode is not 13', () => {
          it('returns 0', () => {
            function checkCharCode(e) {
              expect(e.charCode).toBe(0);
            }

            var component = ReactDOM.render(<input type="text" onKeyPressCapture={checkCharCode} />, container);

            var node = ReactDOM.findDOMNode(component);

            ReactTestUtils.Simulate.keyPress(node, {
              charCode: 31,
            });
          });
        });
      });
    });
  });

  /**
    nativeEvent is represented as a plain object here to ease testing, because
    KeyboardEvent's 'charCode' event key cannot be deleted to simulate a missing
    charCode key.
  */
  describe('when charCode is not present in nativeEvent', () => {
    describe('when keyCode is 32 or bigger', () => {
      it('returns keyCode', () => {
        var nativeEvent = {keyCode: 32};

        expect(getEventCharCode(nativeEvent)).toBe(32);
      });
    });

    describe('when keyCode is smaller than 32', () => {
      describe('when keyCode is 13', () => {
        it('returns 13', () => {
          var nativeEvent = {keyCode: 13};

          expect(getEventCharCode(nativeEvent)).toBe(13);
        });
      });

      describe('when keyCode is not 13', () => {
        it('returns 0', () => {
          var nativeEvent = {keyCode: 31};

          expect(getEventCharCode(nativeEvent)).toBe(0);
        });
      });
    });
  });
});
