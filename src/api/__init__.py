from datetime import datetime
from flask import Flask, abort, request
from api.space_trader import SpaceTrader
from api.enums import Faction

app = Flask(__name__, static_folder="../../dist", static_url_path="/")
app.debug = True
st = SpaceTrader()


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/api/register", methods=["POST"])
def register():
    return st.register(request.get_json().get("symbol"), Faction.COSMIC)


@app.route("/api/agentdata", methods=["GET"])
def agent_data():
    return st.get_agent()


@app.route("/api/location", methods=["GET"])
def get_location():
    system = request.args.get("system")
    waypoint = request.args.get("waypoint")
    if not system and waypoint:
        abort(400, "Need system and waypoint.")
    return st.view_location(system, waypoint)


@app.route("/api/time")
def get_time():
    return {"time": datetime.now().isoformat()}
