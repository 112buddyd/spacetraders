import requests
from api.enums import Faction
from os import environ as env
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class SpaceTrader:
    def __init__(self):
        self.url = "https://api.spacetraders.io/v2/"
        self.token = env.get("TOKEN", "")
        self.headers = {"Authorization": f"Bearer {self.token}"}
        self.data = {}

    def use_api(self, method: str, route: str, params={}, skip_headers=False):
        if method.upper() not in ("GET", "POST", "PUT", "DELETE"):
            raise Exception("Invalid method.")
        kwargs = {
            "url": self.url + route,
            "method": method.upper(),
        }
        if method.upper() == "GET":
            kwargs["params"] = params
        else:
            kwargs["data"] = params
        if not skip_headers:
            kwargs["headers"] = self.headers
        logger.debug(kwargs)
        response = requests.request(**kwargs)
        return response.ok, response.json()

    def register(self, symbol: str, faction: Faction):
        ok, response = self.use_api(
            "POST",
            "register",
            params={
                "symbol": symbol,
                "faction": faction.value,
            },
            skip_headers=True,
        )
        if not ok:
            return response
        logger.debug(response)
        self.data = response.get("data", {})
        self.token = self.data.get("token", "")
        return self.data

    def get_agent(self):
        ok, response = self.use_api("GET", "my/agent")
        if not ok:
            return response
        self.data = response.get("data", {})
        return self.data

    def view_location(self, system, waypoint):
        ok, response = self.use_api("GET", f"systems/{system}/waypoints/{waypoint}")
        if not ok:
            return response
        logger.debug(response.get("data"))
        return response.get("data")
