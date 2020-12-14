import React, { Component } from "react";
import _ from "lodash";

class Table2 extends Component {
  renderCell = (item, column) => {
    return _.get(item, column.path);
  };
  returnColspan = (columns) => {
    if (columns.length < 4) {
      return 2;
    } else {
      return 4;
    }
  };
  render() {
    const { id, header, data } = this.props;
    return (
      <>
        <div className="section full mt-1 mb-2">
          <div className="section-title">{id}</div>
          <div className="content-header mb-05">
            Information Details on {id} Data
          </div>
          <div className="wide-block p-0">
            <div className="table-responsive">
              <table id={id} className="table">
                <thead>
                  <tr>
                    {header.map((head) => (
                      <th key={head.path} scope="col">
                        {head.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        {header.map((column, index) => (
                          <td key={index}>{this.renderCell(item, column)}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={this.returnColspan(header)}
                        style={{ textAlign: "center" }}
                      >
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Table2;
