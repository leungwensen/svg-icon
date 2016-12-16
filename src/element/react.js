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
    const title = props.title || type;
    delete props.prefix;
    delete props.title;
    delete props.type;
    delete props.url;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" data-type={type} {...props}>
        <g>
          <title>{title}</title>
          <use xlinkHref={`${url}#${type}`}></use>
        </g>
      </svg>
    );
  }
}

SvgIcon.propTypes = {
  prefix: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
};

export default SvgIcon;
