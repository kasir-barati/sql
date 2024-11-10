# Glossary

<dl>
  <dt id="scalarValue">
    <a href="#scalarValue">#</a>
    Scalar value
  </dt>
  <dd>It comes from linear algebra.</dd>
  <dd>
    We use it to <b>differentiate a single number</b> from <b>a vector or matrix</b>.
  </dd>
  <dd>
    <a href="https://softwareengineering.stackexchange.com/q/238033/408819">
      Read more
    </a>.
  </dd>
  <dt id="rowValue">
    <a href="#rowValue">#</a>
    Row value
  </dt>
  <dd>An ordered list of two or more scalar values.</dd>
  <dd>A vector or tuple.</dd>
  <dt id="compositeType">
    <a href="#compositeType">#</a>
    Composite type
  </dt>
  <dd>The structure of a row or record.</dd>
  <dd>Essentially just a list of field names and their data types.</dd>
  <dd>
    <a href="https://www.postgresql.org/docs/current/rowtypes.html">
      Learn more
    </a>
  </dd>
  <dt id="tupleComparison">
    <a href="#tupleComparison">#</a>
    Tuple comparison
  </dt>
  <dd>
    <code>(x, y) < (a, b)</code>
    returns true if one the following equation is true:
    <ul>
      <li><code>x < a</code></li>
      <li><code>x = a and y < b</code></li>
    </ul>
  </dd>
  <dd>
    There are some gotchas when you have <code>NULL</code> values.
    <a href="https://www.postgresql.org/message-id/53EB40A3.9010708@ibotty.net">Read this for more info</a>.
  </dd>
  <dt id="aggregateFunction">
    <a href="#aggregateFunction">#</a>
    Aggregate function
  </dt>
  <dd>
    Computes a single result from multiple input rows.
  </dd>
</dl>
