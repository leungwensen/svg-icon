/* eslint-disable */
const {
  Component,
  PropTypes
} = require('react');

const DEFAULT_PREFIX = 'si-';

class SvgIcon extends Component {
  render() {
    const me = this;
    const props = Object.assign(me.props);
    const prefix = props.prefix || DEFAULT_PREFIX;
    const type = `${prefix}${props.type}`;
    const url = props.url || '';
    delete props.prefix;
    delete props.type;
    delete props.url;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" data-type={type} {...props}>
        <use xlinkHref={`${url}#${type}`}></use>
      </svg>
    );
  }
}

SvgIcon.propTypes = {
  prefix: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default SvgIcon;
